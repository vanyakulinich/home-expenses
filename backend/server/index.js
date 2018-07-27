const {server, passport} = require('./config');
const jwt = require('jsonwebtoken');
var _ = require('lodash');

// server function
function Server(db) {

    let {UserModel, CategoryModel, ListOfCatsModel, ExpensesModel} = db;

// registration routes
    // sign in route
    server.post('/signin', (req, res)=>{
        let {email, pass} = req.body;
        UserModel.findOne({email, pass}, (er, user)=>{
            if(er) console.log(er)
            if(user) {
                jwt.sign({ email, pass }, 'secretKey', (er, token) => {
                    user.save((er)=>{
                    if(er) console.log(er)
                    })
                    res.json({ token, email })
                })
            } else {
                res.json('nouser')
            }
        })
    })
    // sign up route
    server.post('/signup', (req, res)=>{
        let {email, pass} = req.body

        UserModel.findOne({email, pass}, (er, user)=>{
            if(user) res.send('isuser')
            if(!user) {
                let verifyKey = Math.round(1000 + Math.random()*8999)
        
                let newUser = new UserModel({
                    userId: Date.now(),
                    email,
                    pass,
                    verified: false,
                    verifyKey,
                })
                newUser.save(er=>{
                    if(er) console.log(er)
                    console.log(`http://localhost:3000/verify&${email}&${Date.now()}&${verifyKey}`)
                    res.send('verify')
                })
            }
        })
    })
    // email verification route 
    server.post(/\/verify/, (req, res)=>{
        let{ email, verifyKey } = req.body;
        UserModel.findOne({email, verifyKey}, (er, user)=>{
            if(er) console.log(er)
            if(!user) res.json('nouser');
            let{email, pass} = user;
            jwt.sign({email, pass}, 'secretKey', (er, token) => {
                user.verified = true;
                user.verifyKey = 0;
                user.save(er=>{
                    if(er) console.log(er)
                    res.json({token})
                })
            })
        })
    })



// secured route with passport auth for working with user data
// now the route is tested


    // ------rewriting proccess-------------
    // 

    // get user data
    server.get('/userdata', passport.authenticate('jwt', {session: false}), (req, res)=>{
        res.json({
            email : req.user.email,
            categories: req.user.categories,
            expenses: req.user.expenses,
            descriptionBase: req.user.descriptionBase
        })
    })

    // config categories routes

    server.route('/userdata/config/category')
        // add new category
        .post(passport.authenticate('jwt', {session: false}), (req, res)=>{
            let cats = req.user.categories
            // add new category
            let newCat = new CategoryModel({
                name: 'New Category',
                parent: null,
                isChild: false,
                children: 0,
                prev: (cats.length) ? cats[cats.length-1]._id : null,
                next: null,
                date: Date.now(),
                value: 0,
            })
            cats.push(newCat)
            if(cats[cats.length-2]) cats[cats.length-2].next = newCat._id

            req.user.save(er=>{
                if(er) console.log(er)
                res.json({
                    categories: req.user.categories, 
                })
            }) 
        })

        // rename category
        .put( passport.authenticate('jwt', {session: false}), (req, res)=>{
            let itemForRename = _.findIndex(req.user.categories, item=>{
                return item._id == req.body.id
            })

            req.user.categories[itemForRename].name = req.body.name

            req.user.save(er=>{
                if(er) console.log(er)
                res.json({
                    categories: req.user.categories, 
                })
            })  
        })

        // delete category
        .delete(passport.authenticate('jwt', {session: false}), (req, res)=>{
            
            let itemForDelete = _.findIndex(req.user.categories, item=>{
                return item._id == req.body.id
            })

             //synchonizing with parent category 
              if(req.user.categories[itemForDelete].isChild) { 
                let parentIndex = _.findIndex(req.user.categories, el=>{
                    return el._id == req.user.categories[itemForDelete].parent
                })
                // delete values from parent category
                if(req.user.categories[parentIndex].value) {
                    req.user.categories[parentIndex].value -=req.user.categories[itemForDelete].value
                }

                if(req.user.categories[parentIndex].children>0) req.user.categories[parentIndex].children -=1
                
                if(req.user.categories[parentIndex].isChild) { // if we are in the middle of the tree
                    req.user.categories[itemForDelete].parent = req.user.categories[parentIndex].parent
                } else {
                    req.user.categories[itemForDelete].parent = null
                    req.user.categories[itemForDelete].isChild = false 
                }
                
            } else {
            // deletion of upper level category
            req.user.categories.splice(itemForDelete, 1)
            req.user.categories = req.user.categories.filter(el=>{
                return (el.parent !== req.body.id)
                })
            }

            req.user.save(er=>{
                if(er) console.log(er)
                res.json({  
                    categories: req.user.categories, 
                })
            })
            
        })
    
    // add subcategory
    server.post('/userdata/config/sub', passport.authenticate('jwt', {session: false}), (req, res)=>{

            let itemForSub = _.findIndex(req.user.categories, item=>item._id == req.body.id)

            req.user.categories[itemForSub].parent = req.body.parent;
            req.user.categories[itemForSub].isChild = true;

            let parentItem = _.findIndex(req.user.categories, el=>el._id==req.body.parent)

            req.user.categories[parentItem].children +=1;

        req.user.save(er=>{
            if(er) console.log(er)
        })
        res.json({categories: req.user.categories})
    })

    // =-----------------

    // moving categories and subcategories
    server.put('/userdata/config/move', passport.authenticate('jwt', {session: false}), (req, res)=>{
        console.log(req.body)
        let itemToMove = _.findIndex(req.user.categories, item=>item._id == req.body.id)
        let itemToChangePlace;
        // let direction = (req.body.direction ? itemToMove-1 : itemToMove+1)
        console.log(itemToMove)
        // if category is in head
        if(!req.user.categories[itemToMove].isChild && 
            req.user.categories[itemToMove].children) {
                itemToChangePlace = req.body.direction ? 
                                    (_.findLastIndex(req.user.categories, (item)=>!item.isChild, itemToMove-1)) : 
                                        (_.findIndex(req.user.categories, (item)=>!item.isChild, itemToMove+1))
        }

        // if category is in middle of tree
        if(req.user.categories[itemToMove].isChild && 
           req.user.categories[itemToMove].children) {
                itemToChangePlace = req.body.direction ? 
                                    (_.findLastIndex(req.user.categories, (item)=>{
                                        return item.isChild && item.children}, itemToMove-1)) : 
                                        (_.findIndex(req.user.categories, (item)=>{
                                            return item.isChild && item.children}, itemToMove+1))
        }


        // if category is at bottom or at top but with no children
        if((req.user.categories[itemToMove].isChild && !req.user.categories[itemToMove].children) ||
            (!req.user.categories[itemToMove].isChild && !req.user.categories[itemToMove].children)) {
            itemToChangePlace = req.body.direction ? itemToMove-1 : itemToMove+1
        }


        let bufferAr = [...req.user.categories]
        let bufferItem = bufferAr[itemToChangePlace]
        bufferAr[itemToChangePlace] = bufferAr[itemToMove]
        bufferAr[itemToMove] = bufferItem

        req.user.categories = [...bufferAr]




        //  // moving up
        // if(req.body.direction) {
            


        //     c
        //     // if(!req.user.categories[itemToMove].isChild && 
        //     //    !req.user.categories[itemToMove].children) {
        //         // let itemToChangePlace = _.findLastIndex(req.user.categories, (item, i)=>{
        //         //     return (!item.isChild && !item.children)
        //         // }, 
        //         // itemToMove-1)

        //         let bufferAr = [...req.user.categories]
        //         let bufferItem = bufferAr[itemToMove-1]
        //         bufferAr[itemToMove-1] = bufferAr[itemToMove]
        //         bufferAr[itemToMove] = bufferItem

        //         // let bufferAr = [...req.user.categories]
        //         // let bufferItem = bufferAr[itemToChangePlace]
        //         // bufferAr[itemToChangePlace] = bufferAr[itemToMove]
        //         // bufferAr[itemToMove] = bufferItem

        //         req.user.categories = [...bufferAr]
        //     // }
        //     // -

        // } else {
        //     // moving down


        //     //  // if category is in head - it has no children and it is not a child
        //     // if(!req.user.categories[itemToMove].isChild && 
        //     //     !req.user.categories[itemToMove].children) {
        //         let itemToChangePlace = _.findIndex(req.user.categories, (item, i)=>{
        //             return (!item.isChild && !item.children)
        //         }, itemToMove+1)


            
        //         let bufferAr = [...req.user.categories]
        //         let bufferItem = bufferAr[itemToMove+1]
        //         bufferAr[itemToMove+1] = bufferAr[itemToMove]
        //         bufferAr[itemToMove] = bufferItem

        //         req.user.categories = [...bufferAr]

        //     // }
        // }
        req.user.save(er=>{
            if(er) console.log(er)
            res.json({categories: req.user.categories})
        })
        
    })

//-----------------------------------
    // user puts expenses on dashboard page
    server.put('/userdata/expenses', passport.authenticate('jwt', {session: false}), (req, res)=>{
       console.log(req.body)

        let index = _.findIndex(req.user.categories, el=>el._id==req.body.id)

        let date = `${new Date()}`.split(' ')

        let newExpense = new ExpensesModel({
            category: req.user.categories[index].name,
            description: req.body. description,
            value: req.body.value,
            date : `${date[0]} ${date[1]} ${date[2]} ${date[3]}`,
            creationDate: Date.now() 
        })

        req.user.categories[index].value = req.body.value;

        if(req.user.categories[index].parent) { // if category has parent
            let parentIndex = _.findIndex(req.user.categories, el=>el._id==req.user.categories[index].parent)
            req.user.categories[parentIndex].value += req.body.value
        }

        req.user.descriptionBase.push(req.body.description)

        req.user.expenses.push(newExpense)

        req.user.save(er=>{
            if(er) console.log(er)
            let expenses = req.user.expenses ? [...req.user.expenses].reverse().slice(0, 20) : []
            res.json({
                categories: req.user.categories, 
                expenses,

            })
        })
       
    })
    
   
        








     // rename category
    //  server.put('/userdata/config/rename', passport.authenticate('jwt', {session: false}), (req, res)=>{

    //     if(req.body.parent) {
            
    //         let cats = [...req.user.categories]

    //         let parentIndex = _.findIndex(cats, item=>{
    //             return item.name == req.body.parent})
    //         let subCats = [...cats[parentIndex].children]
           
    //         let renameIndex = _.findIndex(subCats, item=> item._id == req.body.id)

    //         subCats[renameIndex].name = req.body.name

    //         cats[parentIndex].children = [...subCats]
    //         req.user.categories = [...cats]

    //         req.user.save(er =>{
    //             if(er) console.log(er)
    //         })
              
    //     } else {
    //         let cats = [...req.user.categories]
    //         let renameIndex = _.findIndex(cats, item=> item._id == req.body.id)

    //         let children = [...cats[renameIndex].children]
    //         children.forEach(item=>{
    //             item.parentName = req.body.name
    //         })

    //         cats[renameIndex].children = [...children]

    //         cats[renameIndex].name = req.body.name

    //         req.user.categories = [...cats]

    //         req.user.save(er =>{
    //             if(er) console.log(er)
                
    //         })  
    //     }

    //     res.json(req.user.categories)
    // })



    // server.route('/userdata/config')
    //     // adding new categories and subcategories
    //     .post(passport.authenticate('jwt', {session: false}), (req, res)=>{
    //         // adding subcategories
    //         if(req.body.parent)  {
    //             console.log(req.body)
    //             let newCat = new SubCategoryModel({name: req.body.name, parentName: req.body.parent})
    //             let parentItem = _.findIndex(req.user.categories, item=>{
    //                 return item.name ===req.body.parent})
                    
    //             let cats = [...req.user.categories]
                
    //             cats[parentItem].children.push(newCat)
                    
    //             req.user.categories = cats
    //             req.user.save(er=>{
    //                 if(er) console.log(er)
    //             })
    //            res.json(req.user.categories)
    //         }  else {

    //             // adding new category
    //             let cats = [...req.user.categories]
    //             let newCat = new CategoryModel({name: req.body.name})
    //             cats.push(newCat)
    //             req.user.categories = cats
    //             req.user.save(er=>{
    //                 if(er) console.log(er)
    //             })
    //             res.json(req.user.categories)
    //         } 
    //     })

    //     // update user categories and subcategories position
    //     .put(passport.authenticate('jwt', {session: false}), (req, res)=>{
            
    //         if(req.body.parent) {

    //             let parentIndex = _.findIndex(req.user.categories, item=>{
    //                 return item.name == req.body.parent})

    //                 let categories = [...req.user.categories[parentIndex].children]
    //                 // console.log(categories)
    //                 if(req.body.direction) {
    //                     if(req.body.position == 0) {
    //                         console.log(req.body)
    //                         let splicedItem = categories.splice(0, 1)
                            
    //                         console.log(splicedItem)
                            
    //                         req.user.categories[parentIndex].children = [...categories]

    //                         // let uppercategories



    //                         req.user.save()
                            
                            
                            
    //                         return res.json(req.user.categories)
    //                     }
    //                     let bufferAr = [...categories]
    //                     let pos = req.body.position
    //                     let buff= bufferAr[pos-1]
    //                     bufferAr[pos-1] = bufferAr[pos]
    //                     bufferAr[pos] = buff
    
    //                     req.user.categories[parentIndex].children = bufferAr
    //                     req.user.save(er=>{
    //                         if(er) console.log(er)
    //                     })
                        
    //                 } else {
    //                     if(req.body.position == categories.length-1) return res.json(req.user.categories)
    //                     let bufferAr = [...categories]
    //                     let pos = req.body.position
    //                     let buff= bufferAr[pos+1]
    //                     bufferAr[pos+1] = bufferAr[pos]
    //                     bufferAr[pos] = buff
    
    //                     req.user.categories[parentIndex].children = bufferAr
    //                     req.user.save(er=>{
    //                         if(er) console.log(er)
    //                     })
    //                 }
    //         } else {
                
    //             if(req.body.direction) {
    //                 if(req.body.position == 0) return res.json(req.user.categories)
    //                 let bufferAr = [...req.user.categories]
    //                 let pos = req.body.position
    //                 let buff= bufferAr[pos-1]
    //                 bufferAr[pos-1] = bufferAr[pos]
    //                 bufferAr[pos] = buff

    //                 req.user.categories = bufferAr
    //                 req.user.save(er=>{
    //                     if(er) console.log(er)
    //                 })
                    
    //             } else {
    //                 if(req.body.position == req.user.categories.length-1) return res.json(req.user.categories)
    //                 let categories= [...req.user.categories]
    //                 let buff = categories[req.body.position+1]
    //                 categories[req.body.position+1] = categories[req.body.position]
    //                 categories[req.body.position] = buff
    //                 req.user.categories = categories;
    //                 req.user.save(er=>{
    //                     if(er) console.log(er)
    //                 })
    //             }

               
    //         }




    //         res.json(req.user.categories)
    //     })

    //     // delete user categories and subcategories
    //     .delete(passport.authenticate('jwt', {session: false}), (req, res)=>{

    //         // delete a subcategory
    //         if(req.body.parent) {

    //             let parentIndex = _.findIndex(req.user.categories, item=>{
    //                 return item.name == req.body.parent})

    //             let subCats = [...req.user.categories[parentIndex].children]
    //             let newSubCats = _.filter(subCats, item=>item._id != req.body.id)

    //             req.user.categories[parentIndex].children = [...newSubCats]
               
    //             req.user.save(er=>{
    //                 if(er) console.log(er)
    //                 res.json(req.user.categories)
    //             })
    //         } else {
    //         // delete a category
    //             let newList = _.filter(req.user.categories, (el=>{
    //                 return el._id != req.body.id
    //             }))
    //             req.user.categories = newList
    //             req.user.save(er=>{
    //                 if(er) console.log(er)
    //                 res.json(req.user.categories)  
    //             })
    //         }
        
           
    //     })
    
       




    // ---------------------
    // test routes for postman
    server.route('/users')
        .get((req,res)=>{
            UserModel.find({email: /./}, (err, data)=>{
                if(err) console.log(err)
                res.json(data)
            })
        })
        .delete((req, res)=>{
            UserModel.deleteMany({email: /./}, er=>{
                if(er) console.log(er)})
            res.sendStatus(200)
        })

    server.route('/cats')
    .delete((req, res)=>{
        CategoryModel.deleteMany({name: /./}, (er, result)=>{
            res.sendStatus(200)
        })
    })
}


function recursive() {
    
}

module.exports = Server
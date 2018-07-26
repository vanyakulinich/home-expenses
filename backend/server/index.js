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
                    console.log(`http://localhost:3000/verify/${email}/${Date.now()}/${verifyKey}`)
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
        res.json(req.user)
    })

    // config categories routes


    server.route('/userdata/config/category')
        // add new category
        .post(passport.authenticate('jwt', {session: false}), (req, res)=>{
            let cats = req.user.categories
            let newCat = new CategoryModel({
                name: 'New Category',
                parent: null,
                isChild: false,
                children: false,
                prev: (cats.length) ? cats[cats.length-1]._id : null,
                next: null,
                date: Date.now()
            })
            cats.push(newCat)
            if(cats[cats.length-2]) cats[cats.length-2].next = newCat._id

            let newCatInList = new ListOfCatsModel({
                name: newCat.name,
                id: newCat._id
            })
            
            req.user.categoriesList.push(newCatInList)

            req.user.save(er=>{
                if(er) console.log(er)
                res.json({categories: req.user.categories, categoriesList: req.user.categoriesList})
            })
            
        })

        // rename category
        .put( passport.authenticate('jwt', {session: false}), (req, res)=>{
            let itemForRename = _.findIndex(req.user.categories, item=>{
                return item._id == req.body.id
            })

            let itemForRenameInCategoriesList = _.findIndex(req.user.categoriesList, item=>{
                return item.id == req.body.id
            })

            console.log(itemForRenameInCategoriesList)

            req.user.categories[itemForRename].name = req.body.name
            req.user.categoriesList[itemForRenameInCategoriesList].name = req.body.name

            

            req.user.save(er=>{
                if(er) console.log(er)
                res.json({categories: req.user.categories, categoriesList: req.user.categoriesList})
            })
            
        })

        // delete category
        .delete(passport.authenticate('jwt', {session: false}), (req, res)=>{
            
            let itemForDelete = _.findIndex(req.user.categories, item=>{
                return item._id == req.body.id
            })

            if(req.user.categories[itemForDelete].parent) { // delete values of expenses from parent if it exists
                let parentIndex = _.findIndex(req.user.categories, el=>{
                    return el._id == req.user.categories[itemForDelete].parent
                })
                
                req.user.categories[parentIndex].value -= req.user.categories[itemForDelete].value
            }

            req.user.categories.splice(itemForDelete, 1)
            if(req.body.parent) {
                req.user.categories = [...req.user.categories].filter(el=>el.parent!==req.body.id)
            }
            // delete in categories list
            let itemForDeleteInCategoriesList = _.findIndex(req.user.categoriesList, item=>{
                return item.id == req.body.id
            })
            req.user.categoriesList.splice(itemForDeleteInCategoriesList, 1)
            req.user.categoriesList = [...req.user.categoriesList].filter(el=>el!==req.body.name)
            
            // delete expenses of deleted category
            if(req.user.expenses.length>0) {
                req.user.expenses = [...req.user.expenses].filter(el=>el.category!==req.body.name)
            }
            
            req.user.save(er=>{
                if(er) console.log(er)
                res.json({categories: req.user.categories, 
                    categoriesList: req.user.categoriesList,
                    expenses: req.user.expenses})
            })
            
        })
    
        // add subcategory or move subcategory to categories
    server.post('/userdata/config/sub', passport.authenticate('jwt', {session: false}), (req, res)=>{
            console.log(req.body)
            let cats = req.user.categories
            let itemForSub = _.findIndex(req.user.categories, item=>item._id == req.body.id)

            req.user.categories[itemForSub].parent = req.body.parent;
            req.user.categories[itemForSub].isChild = true;

            let itemChildren = req.user.categories.some(el=>{
                return el.parent == req.user.categories[itemForSub]._id})
            if(itemChildren) req.user.categories[itemForSub].children = true


        req.user.save(er=>{
            if(er) console.log(er)
        })
        res.json({categories: req.user.categories})
    })

    // moving categories
    // not finished
    server.put('/userdata/config/move', passport.authenticate('jwt', {session: false}), (req, res)=>{
        console.log(req.body)
        let itemToMove = _.findIndex(req.user.categories, item=>item._id == req.body.id)
        
        if(req.body.direction) {
            // moving up
            if(!req.user.categories[itemToMove].isChild && 
                !req.user.categories[itemToMove].children) {
                let itemToChangePlace = _.findIndex(req.user.categories, item=>{
                    return (item._id !== req.user.categories[itemToMove] &&
                            !item.isChild && !item.children)
                })
                let bufferItem = req.user.categories[itemToChangePlace]
                req.user.categories[itemToChangePlace] = req.user.categories[itemToMove]
                req.user.categories[itemToMove] = bufferItem
            }
        } else {
            // moving down
            if(!req.user.categories[itemToMove].isChild && 
                !req.user.categories[itemToMove].children) {
                let itemToChangePlace = _.findIndex(req.user.categories, (item, i)=>{
                    return (
                            i>itemToMove && 
                            item._id !== req.user.categories[itemToMove] &&
                            !item.isChild && 
                            !item.children)
                })
                // console.log(itemToChangePlace)
                
                // console.log(cats)
                let bufferItem = req.user.categories[itemToChangePlace]
                req.user.categories[itemToChangePlace] = req.user.categories[itemToMove]
                req.user.categories[itemToMove] = bufferItem
                

                console.log(req.user.categories)
            }
        }
        req.user.save(er=>{
            if(er) console.log(er)
        })
        res.json(req.user.categories)
    })


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
            let expenses = [...req.user.expenses].reverse().slice(0, 20)
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
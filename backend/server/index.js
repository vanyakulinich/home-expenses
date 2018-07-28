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
                if(user.verifyKey) res.json({verify:'verify'})

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

             //synchonizing with parent category when subcategory goes to upper level
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
                //deletion of main categories
                //list of categories without deleted one with all her children comes from front
                req.user.categories = req.body.name
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

            req.user.categories[parentItem].value+=req.user.categories[itemForSub].value


           if(req.user.categories[parentItem].parent) { // if category has parent
            let value = req.user.categories[itemForSub].value
            function expenses(parentId) { // synchronize expenses with all parents in chain
                let parentIndex = _.findIndex(req.user.categories, el=>el._id==parentId)
                req.user.categories[parentIndex].value += value
                if(req.user.categories[parentIndex].parent) {
                    expenses(req.user.categories[parentIndex].parent)
                } else {
                    return
                }
            }
            expenses(req.user.categories[parentItem].parent)
        }

                


        req.user.save(er=>{
            if(er) console.log(er)
        })
        res.json({categories: req.user.categories})
    })

    // =-----------------

    // moving categories and subcategories
    server.put('/userdata/config/move', passport.authenticate('jwt', {session: false}), (req, res)=>{
        // console.log(req.body)
        let itemToMove = _.findIndex(req.user.categories, item=>item._id == req.body.id)
        let itemToChangePlace;
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

        req.user.save(er=>{
            if(er) console.log(er)
            res.json({categories: req.user.categories})
        })
        
    })

//-----------------------------------
    // user puts expenses on dashboard page
    server.put('/userdata/expenses', passport.authenticate('jwt', {session: false}), (req, res)=>{
    //    console.log(req.body)

        let index = _.findIndex(req.user.categories, el=>el.name==req.body.id)

        let date = `${new Date()}`.split(' ')

        let newExpense = new ExpensesModel({
            category: req.user.categories[index].name,
            description: req.body.description,
            value: req.body.value,
            date : `${date[0]} ${date[1]} ${date[2]} ${date[3]}`,
            creationDate: Date.now() 
        })

        req.user.categories[index].value += req.body.value;

        if(req.user.categories[index].parent) { // if category has parent

            function expenses(parentId) { // synchronize expenses with all parents in chain
                let parentIndex = _.findIndex(req.user.categories, el=>el._id==parentId)
                req.user.categories[parentIndex].value += req.body.value
                if(req.user.categories[parentIndex].parent) {
                    expenses(req.user.categories[parentIndex].parent)
                } else {
                    return
                }
            }
            expenses(req.user.categories[index].parent)
        }


        let repeatedDescription = req.user.descriptionBase.some(el=>el===req.body.description)
        if(!repeatedDescription) req.user.descriptionBase.push(req.body.description)

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
    
    // ---------------------
    // test route for postman
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
}



module.exports = Server
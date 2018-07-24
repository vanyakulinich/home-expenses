const {server, passport} = require('./config');
const jwt = require('jsonwebtoken');
var _ = require('lodash');

// server function
function Server(db) {

    let {UserModel, CategoryModel, SubCategoryModel} = db;
    // routes
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
                    console.log(`http://localhost:3000/verify`)
                    console.log(verifyKey)
                    res.send('verify')
                })
            }
        })
    })
    // email verification route 
    server.post('/verify', (req, res)=>{
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


    // ниже есть повторяющийся код еще не оптимизированно
    // есть также ерунда которая будет переписана

    // get user data
    server.get('/userdata', passport.authenticate('jwt', {session: false}), (req, res)=>{
        res.json(req.user)
    })

    // config categories routes

     // rename category
     server.put('/userdata/config/rename', passport.authenticate('jwt', {session: false}), (req, res)=>{

   

        if(req.body.parent) {
            
            let cats = [...req.user.categories]

            let parentIndex = _.findIndex(cats, item=>{
                return item.name == req.body.parent})

            let subCats = [...cats[parentIndex].children]
            console.log(subCats)

            let renameIndex = _.findIndex(subCats, item=> item._id == req.body.id)

            subCats[renameIndex].name = req.body.name

            cats[parentIndex].children = [...subCats]
            req.user.categories = [...cats]

            req.user.save(er =>{
                if(er) console.log(er)
            })
              res.json(req.user.categories)

            

        } else {
            let cats = [...req.user.categories]
            let renameIndex = _.findIndex(cats, item=> item._id == req.body.id)

            console.log(req.body.name)
            let children = [...cats[renameIndex].children]
            children.forEach(item=>{
                item.parentName = req.body.name
            })
            console.log(children)

            cats[renameIndex].children = [...children]

            cats[renameIndex].name = req.body.name

            // cats[renameIndex].save(item=>console.log(item))

            req.user.categories = [...cats]
            console.log(req.user.categories)



            req.user.save(er =>{
                if(er) console.log(er)
                
            })
            res.json(req.user.categories)
            
        }

        // res.json(req.user.categories)
    })






    server.route('/userdata/config')
        // adding new categories and subcategories
        .post(passport.authenticate('jwt', {session: false}), (req, res)=>{
            // adding subcategories
            if(req.body.parent)  {
                console.log(req.body)
                let newCat = new SubCategoryModel({name: req.body.name, parentName: req.body.parent})
                let parentItem = _.findIndex(req.user.categories, item=>{
                    return item.name ===req.body.parent})
                    
                let cats = [...req.user.categories]
                
                cats[parentItem].children.push(newCat)
                    
                req.user.categories = cats
                req.user.save(er=>{
                    if(er) console.log(er)
                })
               res.json(req.user.categories)
            }  else {

                // adding new category

                let cats = [...req.user.categories]
                let newCat = new CategoryModel({name: req.body.name})
                cats.push(newCat)
                req.user.categories = cats
                req.user.save(er=>{
                    if(er) console.log(er)
                })
                res.json(req.user.categories)
            } 
        })

        // update user categories and subcategories position
        .put(passport.authenticate('jwt', {session: false}), (req, res)=>{
            
            
            if(req.body.parent) {

                let parentIndex = _.findIndex(req.user.categories, item=>{
                    return item.name == req.body.parent})

                    let categories = [...req.user.categories[parentIndex].children]

                    if(req.body.direction) {
                        if(req.body.position == 0) return res.json(req.user.categories)
                        let pos = req.body.position
                        let buffOne= {...categories[pos-1]}
                        let buffTwo = {...categories[pos]}
                        categories[pos-1] = {...buffTwo}
                        categories[pos] = {...buffOne}
    
                        req.user.categories[parentIndex].children = categories
                        req.user.save(er=>{
                            if(er) console.log(er)
                        })
                        
                    } else {
                        if(req.body.position == categories.length-1) return res.json(req.user.categories)
                        let pos = req.body.position
                        let buffOne = {...categories[pos+1]}
                        let buffTwo = {...categories[pos]}
                        categories[pos+1] = {...buffTwo}
                        categories[pos] = {...buffOne}
                        req.user.categories[parentIndex].children = categories;
                        req.user.save(er=>{
                            if(er) console.log(er)
                        })
                    }
            } else {
                
                if(req.body.direction) {
                    if(req.body.position == 0) return res.json(req.user.categories)
                    let bufferAr = [...req.user.categories]
                    let pos = req.body.position
                    let buff= bufferAr[pos-1]
                    bufferAr[pos-1] = bufferAr[pos]
                    bufferAr[pos] = buff

                    req.user.categories = bufferAr
                    req.user.save(er=>{
                        if(er) console.log(er)
                    })
                    
                } else {
                    if(req.body.position == req.user.categories.length-1) return res.json(req.user.categories)
                    let categories= [...req.user.categories]
                    let buff = categories[req.body.position+1]
                    categories[req.body.position+1] = categories[req.body.position]
                    categories[req.body.position] = buff
                    req.user.categories = categories;
                    req.user.save(er=>{
                        if(er) console.log(er)
                    })
                }

               
            }




            res.json(req.user.categories)
        })

        // delete user categories and subcategories
        .delete(passport.authenticate('jwt', {session: false}), (req, res)=>{

            // delete a subcategory
            if(req.body.parent) {

                let parentIndex = _.findIndex(req.user.categories, item=>{
                    return item.name == req.body.parent})

                let subCats = [...req.user.categories[parentIndex].children]
                let newSubCats = _.filter(subCats, item=>item._id != req.body.id)

                req.user.categories[parentIndex].children = [...newSubCats]
               
                req.user.save(er=>{
                    if(er) console.log(er)
                    res.json(req.user.categories)
                })
            } else {
            // delete a category
                let newList = _.filter(req.user.categories, (el=>{
                    return el._id != req.body.id
                }))
                req.user.categories = newList
                req.user.save(er=>{
                    if(er) console.log(er)
                    res.json(req.user.categories)  
                })
            }
        
           
        })
    
       




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

        server.route('/mongo')
        .get((req, res)=>{
            CategoryModel.find({name: /./}, (er, result)=>{
                res.send(result)
            })
        })
}


module.exports = Server
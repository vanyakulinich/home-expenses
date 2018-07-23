const {server, passport} = require('./config');
const jwt = require('jsonwebtoken');
var _ = require('lodash');

// server function
function Server(db) {

    let {UserModel, CategoryModel} = db;
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
    server.route('/userdata')
        .get(passport.authenticate('jwt', {session: false}), (req, res)=>{
            res.json(req.user)
        })
        .post(passport.authenticate('jwt', {session: false}), (req, res)=>{
            console.log(req.body)
            if(req.body.parent)  {

                let newCat = new CategoryModel({name: req.body.name, parentName: req.body.parent})
                req.user.categories = [...req.user.categories, newCat]
                req.user.save(er=>{
                    if(er) console.log(er)
                })
               
    
                
               







                return res.json(req.user.categories)
            }


            console.log(req.body)
            let newCat = new CategoryModel({name: req.body.name})
            req.user.categories = [...req.user.categories, newCat]
            req.user.save(er=>{
                if(er) console.log(er)
            })
            res.json(req.user.categories)
            
        })
        .put(passport.authenticate('jwt', {session: false}), (req, res)=>{
            let changedItemIndex = _.findIndex(req.user.categories, item=>{
                return item.name ===req.body.oldname})


            req.user.categories[changedItemIndex].name = req.body.newname;
            req.user.save(er=>{
                if(er) console.log(er)
            })
            res.json(req.user)
        })
        .delete(passport.authenticate('jwt', {session: false}), (req, res)=>{
            let newList = _.filter(req.user.categories, (el=>{
                return el._id != req.body.id
            }))
            req.user.categories = newList
            req.user.save(er=>{
                if(er) console.log(er)
                 res.json(req.user.categories)  
            })
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


}


module.exports = Server
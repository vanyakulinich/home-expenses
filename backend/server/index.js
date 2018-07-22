const {server, passport} = require('./config');
const jwt = require('jsonwebtoken');



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
                    res.json({ token })
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
    server.route('/userdata')
        .get(passport.authenticate('jwt', {session: false}), (req, res)=>{
            console.log(req.user.categories)
            res.json(req.user)
        })



    // server.get('/test', passport.authenticate('jwt', { session: false }), (req, res)=>{
    //         console.log(req.user.categories)
    //         res.json(req.user)
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

        // finished here
        // .post((req, res)=>{
        //     let {name, value, user} = req.body
        //     let fakeUserData = new UserDataModel({
        //         user,
        //         categories: [{name,
        //                     value,
        //                     children: true,
        //                     parent: false,}]
        //     })
        //     fakeUserData.save(er=>{
        //         if(er) console.log(er)
        //         res.send('cat posted')
        //     })
        // })
        // .put((req,res)=>{
        //     UserDataModel.findOne({user: 'test'}, (err, data)=>{
        //         if(err) console.log(err)

        //         let newcat = new SingleCategoryModel({
        //             name: 'test2',
        //             value: 30,
        //             children: false,
        //             parent: false
        //         })
        //         data.categories.push(newcat)
        //         data.save(er=>{
        //             if(er) console.log(er)
        //             res.send('ok')
        //         })
        //     })
        // })

}


module.exports = Server
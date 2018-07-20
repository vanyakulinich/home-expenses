const server = require('./config')
const jwt = require('jsonwebtoken');

function Server(db) {

    let {mongoose, UserModel, UnverifiedUsersModel, UserDataModel} = db;
    
    // sign in route
    server.post('/signin', (req, res)=>{
        let {email, pass} = req.body;
        UserModel.findOne({email, pass}, (er, user)=>{
            if(er) console.log(er)

            if(user) {
                jwt.sign({ email, pass }, 'secretKey', (er, token) => {
                    user.token = token
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

    //  sign out route
    server.post('/signout', (req, res)=>{
        let {token} = req.body;
        UserModel.findOneAndUpdate({token}, {token: null}, (er)=>{
            if(er) console.log(er)
            res.send('signedOut')
        })
    })



//  sign up route
    server.post('/signup', (req, res)=>{
        let {email, pass} = req.body

        UserModel.findOne({email, pass}, (er, user)=>{
            if(user) res.json('userExists')
            if(!user) {
                let verifyKey = Math.round(1000 + Math.random()*8000)
                let unverifiedUser = new UnverifiedUsersModel({
                    email,
                    pass,
                    verifyKey
                })
                unverifiedUser.save(er=>{
                    if(er) console.log(er);
                    console.log(`http://localhost:3000/verify`)
                    console.log(verifyKey)
                    res.sendStatus(200)
                })
            }
        })
    })

    server.post('/verify', (req, res)=>{
        let{email, verifyKey} = req.body;

        UnverifiedUsersModel.findOne({email, verifyKey}, (er, user)=>{

            if(!user) {
                res.json('nouser');
                return null
            }

            let{email, pass} = user;

            jwt.sign({ email, pass }, 'secretKey', (er, token) => {
                let newUser = new UserModel({token, email, pass})
                newUser.save((er)=>{
                    if(er) console.log(er)
                    console.log('new user added')
                })
                res.json({ token })
            })
            return true
        })
        .then((userExists)=>{
            if(userExists) {
                UnverifiedUsersModel.deleteOne({verifyKey}, er=>{
                    if(er) console.log(er)
                    console.log('unverified user deleted')
                })
            }
        })
        .catch(e=>console.log(e))
    })





// ---------------------
// test routes for postman
    server.get('/test', (req,res)=>{
        res.send('ok')
    })


    server.get('/allusers', (req,res)=>{

        // UserDataModel.find({categories:[1, 2, 3]}, (err, users)=>{
        //     if(err) console.log(err)
        //     res.json(users)
        // })
        UserModel.find({pass:/./}, (err, users)=>{
            if(err) console.log(err)
            res.json(users)
        })
    })

    server.get('/delusers', (req, res)=>{
        UserModel.deleteMany({pass: /./}, er=>{
            if(er) console.log(er)})
        res.sendStatus(200)
    })

    server.get('/unverified', (req, res)=>{
        UnverifiedUsersModel.find({pass:/./}, (err, users)=>{
            if(err) console.log(err)
            res.json(users)
        })
    })

    server.get('/delunverified', (req, res)=>{
        UnverifiedUsersModel.deleteMany({pass:/./}, er=>{
            if(er) console.log(er)
            res.sendStatus(200)
        })
    })


    // checking how to make connections between schemas
    server.post('/fakedata', (req, res)=>{

        let {email} = req.body

        let fakeUserData = new UserDataModel({
            categories: [1, 2, 3]
        })

        fakeUserData.save(er=>{
            if(er) console.log(er)

            let fakeUser = new UserModel({
                token: 'token',
                email,
                pass: 'pass',
                data: fakeUserData.categories
            })

            fakeUser.save(er=>{
                if(er) console.log(er)
                res.send('done')
            })



        })




        

       
    })

    server.get('/getfakedata', (req, res)=>{

        // UserModel
        //     .findOne({token: 'token'})
        //     .populate('data')
        //     .exec((er, result)=>{
        //     if(er) console.log(er)
        //     res.json(result.data.categories)
        // })
    })
    server.delete('/deletefakedata', (req, res)=>{
        UserModel.deleteMany({token:/./}, er=>{
            if(er) console.log(er)
            res.send('done')
        })
    })
}


module.exports = Server
const server = require('./config')
const jwt = require('jsonwebtoken');

function Server(db) {

    let {UserModel, UnverifiedUsersModel} = db;
    
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
            console.log(user)
            if(user) res.json('userExists')
            if(!user) {
                let verifyKey = Math.round(1000 + Math.random()*8000)
                
                let unverifiedUser = new UnverifiedUsersModel({
                    email,
                    pass,
                    verifyKey
                })

                unverifiedUser.save(er=>{
                    if(er) console.log(er)
                    res.json({verifyKey})
                })
            }
        })
    })










// ---------------------
// test routes for postman
    server.get('/test', (req,res)=>{
        res.send('ok')
    })


    server.get('/allusers', (req,res)=>{
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
}


module.exports = Server
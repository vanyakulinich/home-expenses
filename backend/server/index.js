const server = require('./config')
const jwt = require('jsonwebtoken');

function Server(db) {

    let {UserModel} = db;
    
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


//  sign up route
    server.post('/signup', (req, res)=>{
        let {email, pass} = req.body
        let newUser = new UserModel({
            token: null, 
            email,
            pass
        })
        newUser.save(er=>{
            if(er) throw er
            console.log('new user signed up')
        })
        res.sendStatus(200)

    })

//  sign out route
    server.post('/signout', (req, res)=>{
        let {token} = req.body;
        UserModel.findOneAndUpdate({token}, {token: null}, (er)=>{
            if(er) console.log(er)
            res.send('signedOut')
        })
    })









// ---------------------
// test routes for postman
    server.get('/test', (req,res)=>{
        res.send('ok')
    })


    server.get('/allusers', (req,res)=>{
        UserModel.find({pass:/[a-z]/}, (err, users)=>{
            if(err) console.log(err)
            res.json(users)
        })
    })

    server.get('/delusers', (req, res)=>{
        UserModel.deleteMany({pass: /[a-z]/}, er=>{
            if(er) console.log(er)})
        res.sendStatus(200)
    })
}


module.exports = Server
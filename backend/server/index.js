const server = require('./config')
const jwt = require('jsonwebtoken');

function Server(db) {

    let {UserModel} = db;
    

    server.post('/signin', (req, res)=>{
        console.log(req.body)
        let {email, pass} = req.body;




        // jwt.sign({ email, pass }, 'secretKey', (er, token) => {

        //     let newUser = new UserModel({
        //         token, 
        //         email,
        //         pass
        //     })
        //     newUser.save(er=>{
        //         if(er) throw er
        //         console.log('user signed')
        //     })

        //     res.json({ token })
        // })
    })



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
        UserModel.deleteMany({pass: /[a-z]/}, er=>console.log(er))
        res.sendStatus(200)
    })
}


module.exports = Server
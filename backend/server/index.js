const server = require('./config')
const jwt = require('jsonwebtoken');

function Server(db) {

    let {UserModel, UnverifiedUsersModel, SingleCategoryModel} = db;
    
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

    server.get('/allusers', (req,res)=>{
        UserModel.find({pass:/./}, (err, users)=>{
            if(err) console.log(err)
            res.json(users)
        })
    })

    server.get('/allcats', (req,res)=>{
        SingleCategoryModel.find({name: /./}, (err, cats)=>{
            if(err) console.log(err)
            res.json(cats)
        })
    })

    server.delete('/delusers', (req, res)=>{
        UserModel.deleteMany({pass: /./}, er=>{
            if(er) console.log(er)})
        res.sendStatus(200)
    })
//    del test categories
    server.delete('/delcats', (req, res)=>{
        SingleCategoryModel.deleteMany({name: /./}, er=>{
            if(er) console.log(er)})
        res.sendStatus(200)
    })

    server.post('/cat', (req, res)=>{

        let {name, value} = req.body

        let fakeCateg = new SingleCategoryModel({
            name,
            value,
            children: true,
            parent: false,
        })

        fakeCateg.save(er=>{
            if(er) console.log(er)
            res.send('cat posted')
        })
    })
}


module.exports = Server
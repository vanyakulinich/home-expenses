const server = require('./config');
const jwt = require('jsonwebtoken');

function Server(db) {

    let {UserModel, UnverifiedUsersModel, SingleCategoryModel, UserDataModel} = db;
    
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

server.route('/userdata')
    .get((req,res)=>{
        UserDataModel.find({user: 'test'}, (err, data)=>{
            if(err) console.log(err)
            res.json(data)
        })
    })
    .delete((req, res)=>{
        UserDataModel.deleteMany({user: 'test'}, er=>{
            if(er) console.log(er)})
        res.sendStatus(200)
    })
    .post((req, res)=>{
        let {name, value, user} = req.body
        let fakeUserData = new UserDataModel({
            user,
            children: [{name,
                        value,
                        children: true,
                        parent: false,}]
        })
        fakeUserData.save(er=>{
            if(er) console.log(er)
            res.send('cat posted')
        })
    })
    .put((req,res)=>{
        UserDataModel.findOne({user: 'test'}, (err, data)=>{
            if(err) console.log(err)

            let newcat = new SingleCategoryModel({
                name: 'test2',
                value: 30,
                children: false,
                parent: false
            })
            data.children.push(newcat)
            data.save(er=>{
                if(er) console.log(er)
                res.send('ok')
            })
        })
    })
}


module.exports = Server
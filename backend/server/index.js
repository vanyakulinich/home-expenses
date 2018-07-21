const server = require('./config');
const jwt = require('jsonwebtoken');

function Server(db) {

    let {UserModel, CategoryModel} = db;
    
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
                let newUser = new UserModel({
                    email,
                    pass,
                    token: verifyKey,
                })

                newUser.save(er=>{
                    if(er) console.log(er)
                    res.json('saved')
                })
            }
        })
    })

    server.post('/verify', (req, res)=>{
        let{email, verifyKey} = req.body;

        UserModel.findOne({email, token: verifyKey}, (er, user)=>{

            if(!user) res.json('nouser');

            let{email, pass} = user;

            jwt.sign({ email, pass }, 'secretKey', (er, token) => {

                user.token = token;

                user.save(er=>{
                    if(er) console.log(er)
                    res.json({token})
                })
            })
            return true
        })
    })





// ---------------------
// test routes for postman

server.route('/userdata')
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
    .post((req, res)=>{
        let {name, value, user} = req.body
        let fakeUserData = new UserDataModel({
            user,
            categories: [{name,
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
            data.categories.push(newcat)
            data.save(er=>{
                if(er) console.log(er)
                res.send('ok')
            })
        })
    })
}


module.exports = Server
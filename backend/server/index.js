const server = require('./config')


function Server(db) {

    let {UserModel} = db;
    console.log(UserModel)
    
    server.get('/test', (req,res)=>{
        res.send('ok')
    })

    server.post('/signin', (req, res)=>{
        console.log(req.body)
        res.send(req.body)
    })

    server.post('/signup', (req, res)=>{
        console.log(req.body)
        res.send(req.body)
    })
}


module.exports = Server
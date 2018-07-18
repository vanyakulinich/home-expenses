const server = require('./config')


function Server() {
    
    
    server.get('/', (req,res)=>{
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
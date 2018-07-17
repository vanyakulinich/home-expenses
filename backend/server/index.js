const server = require('./config')


function Server() {
    
    
    server.get('/', (req,res)=>{
        res.send('ok')
    })
}


module.exports = Server
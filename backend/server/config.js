const server = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3001;

server
    .use(cors())
    .use(bodyParser.json());


server.listen(PORT, console.log('server listen on 3001'))

module.exports = server;
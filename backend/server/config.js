const server = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3001;
const passport = require("passport");
const passportJWT = require("passport-jwt");
const {UserModel} = require('../database/models')

// psssport init
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    UserModel.findOne({email: jwt_payload.email}, (er, user)=>{
        if(er) console.log(er)
        next(null, (user ? user : false))
    }) 
  });
  
passport.use(strategy);

server
    .use(cors())
    .use(passport.initialize())
    .use(bodyParser.json())


server.listen(PORT, console.log('server listen on 3001'))

module.exports = {server, passport};
const { decode } = require('jsonwebtoken');

const jwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport =>{
    const opts={
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey : 'secretPassword' //TODO deberia estar en una variable
    }
    passport.use(new jwtStrategy(opts, (decoded, done)=>{
        console.log('decoded jwt', decoded);
        return done(null, decoded);
    }));
}

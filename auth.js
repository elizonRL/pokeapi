const jwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport =>{
    const opts={
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey : 'secretPassword' //TODO deberia estar en una variable
    }
    passport.use(new jwtStrategy(opts, (decode, done)=>{
        console.log('decoded jwt', decode);
        return done(null, false);
    }));
}

const jwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt= require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = ()=>{
    const opts={
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey : 'secretPassword' //TODO deberia estar en una variable
    }
    passport.use(new jwtStrategy(opts, (decoded, done)=>{
        console.log('decoded jwt', decoded);
        return done(null, decoded);
    }));
}
const protectWithJwt = (req, res, next)=>{
    if(req.path =='/'|| req.path =='/auth/login'){
        return next();
    }
    return passport.authenticate('jwt', {session: false})(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;
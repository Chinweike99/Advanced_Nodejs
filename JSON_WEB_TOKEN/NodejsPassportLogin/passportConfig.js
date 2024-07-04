// Contains all passport related
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail){
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null){
            return done(null, false, {message: "User does not exist"})
        }
        try{
            if (bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: 'Passwword Incorrect'})
            }
        }catch(error){
            return done(e);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((user, done) => { })
}

module.exports = initialize
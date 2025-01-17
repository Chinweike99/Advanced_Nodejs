// Contains all passport related
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null){
            return done(null, false, {message: "User does not exist"})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: 'Passwword Incorrect' })
            }
        }catch(error){
            return done(error);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
    })
}

module.exports = initialize
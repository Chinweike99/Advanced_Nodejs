if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const users = [];

const initializePassport = require('./passportConfig')
initializePassport(
    passport, 
    email=> users.find(user => user.email === email),
    id => users.find(user => user.id === id),
);

app.set('view-engine', 'ejs'); // This tells our server that w are working with ejs
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,// Key to keep secret as to encrypt all of our informations
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: true})) // Since data would be gotten from form

const port = 3400;
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name })
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true,
    failureRedirect: '/login'
}))

app.get('/register',checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
            // password: req.body.hashedPassword
        })
        res.redirect('/login');
        // console.log(users.push);
    } catch(error){
        res.redirect('/register');
    }
    console.log(users);
})

// FUNCTION TO PROTECT ROUTES
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}
function checkNotAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next();
}


app. listen(port, ()=>{
    console.log(`Listening to PORT ${port}`)
})
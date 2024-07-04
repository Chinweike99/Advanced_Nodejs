const express = require('express');
const app = express();
const bcrypt = require('bcrypt');


app.set('view-engine', 'ejs'); // This tells our server that w are working with ejs
const port = 3400;

app.use(express.urlencoded({extended: true})) // Since data would be gotten from form
const users = [];


app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Akwolu Innocent Chinweike"})
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
})

app.post('/login', (req, res) => {

})

app.get('/register', (req, res) => {
    res.render("register.ejs");
})

app.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.hashedPassword
        })
        res.redirect('/login');
        // console.log(users.push);
    } catch(error){
        res.redirect('/register');
    }
    console.log(users);
})




app. listen(port, ()=>{
    console.log(`Listening to PORT ${port}`)
})
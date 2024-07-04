const express = require('express');
const app = express();

app.set('view-engine', 'ejs'); // This tells our server that w are working with ejs
const port = 3400;

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Akwolu Innocent Chinweike"})
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
})

app.get('/register', (req, res) => {
    res.render("register.ejs");
})

app. listen(port, ()=>{
    console.log(`Listening to PORT ${port}`)
})
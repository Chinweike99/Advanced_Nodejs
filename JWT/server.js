const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json()) // This allows our application to use json from the body up to the part that get passed to it from a request.
const port = 3200;

const posts = [
    {
        username: "Chinwe",
        email: "Chinweike@gmail.com",
        age: 26
    },
    {
        username: "Innocent",
        email: "Chinweike@gmail.com",
        age: 27
    }
]


app.get('/', (req, res) =>{
    res.render('index.ejs', { post: posts})
})
app.get('/posts', (req, res) =>{
    res.json(posts)
    console.log(posts);
})

//Route to Authenticate user
app.get('/login', (req, res) => {
    // Authenticate User (Use what was learnt on paport, bcrypt to achieve this).

})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
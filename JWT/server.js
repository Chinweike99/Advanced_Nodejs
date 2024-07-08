require('dotenv').config()

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


app.get('/posts', authenticateToken, (req, res) =>{
    res.json(posts.filter(post => post.username === req.user.name))
    console.log(posts);
})

//Route to Authenticate user
app.post('/login', (req, res) => {
    // Authenticate User (Use what was learnt on passport, bcrypt etc to achieve this).
    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
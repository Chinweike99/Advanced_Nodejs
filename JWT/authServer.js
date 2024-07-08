require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json()) // This allows our application to use json from the body up to the part that get passed to it from a request.
const port = 3300;

let refreshTokens = [];
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccess({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

// DELETE TOKEN
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

//Route to Authenticate user
app.post('/login', (req, res) => {
    // Authenticate User (Use what was learnt on passport, bcrypt etc to achieve this).
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccess(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccess(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
}

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
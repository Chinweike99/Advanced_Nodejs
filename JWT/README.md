### CODE EXPLANATION

## **authServer.js**
***require('dotenv').config():***

Loads environment variables from a .env file into process.env. This is used to keep sensitive information like secrets out of your code.

***const express = require('express');:***
Imports the Express framework, which is used to build web applications.

***const jwt = require('jsonwebtoken');:***
Imports the jsonwebtoken library, which is used to create and verify JSON Web Tokens (JWTs).


***const app = express();:***
Creates an instance of an Express application.

***app.use(express.json()):***
Middleware that parses incoming requests with JSON payloads and is based on body-parser. It makes it possible to access the data sent in the request body via req.body.

***const port = 3300;:***
Sets the port number on which the server will listen.

*let refreshTokens = [];:*
Initializes an array to store refresh tokens.

***app.post('/token', (req, res) => { ... }):***
Endpoint to handle requests for new access tokens using a refresh token.

***const refreshToken = req.body.token:***
Extracts the refresh token from the request body.

***if(refreshToken == null) return res.sendStatus(401):***
Returns a 401 status if no refresh token is provided.

***if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403):***
Returns a 403 status if the refresh token is not in the stored list.

***jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => { ... }):***
Verifies the refresh token. If valid, creates a new access token.

***app.delete('/logout', (req, res) => { ... }):***
Endpoint to handle user logout by removing their refresh token from the list.

***refreshTokens = refreshTokens.filter(token => token !== req.body.token):***
Filters out the provided token from the refresh tokens list.

***app.post('/login', (req, res) => { ... }):***
Endpoint to handle user login.

***const username = req.body.username:***
Extracts the username from the request body.

****const user = { name: username }:****
Creates a user object with the username.

***const accessToken = generateAccess(user):***
Generates an access token for the user.

***const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET):***
Generates a refresh token for the user.

***refreshTokens.push(refreshToken):***
Adds the refresh token to the stored list.

***res.json({ accessToken: accessToken, refreshToken: refreshToken }):***
Responds with the access token and refresh token.

***function generateAccess(user){ ... }:***
Function to generate an access token for a user.

***return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'}):***
Signs the JWT with the user's information and sets an expiration time of 60 seconds.


***app.listen(port, () => { ... }):***
Starts the server on the specified port and logs a message when it's ready.


## **server.js**
***require('dotenv').config():***
Loads environment variables from a .env file into process.env.

***const posts = [ ... ]:***

An array of post objects. These could represent user data or blog posts, for example.

***app.get('/posts', authenticateToken, (req, res) => { ... }):***

Endpoint to get posts. It is protected by the authenticateToken middleware.

***res.json(posts.filter(post => post.username === req.user.name)):***

Responds with posts that match the authenticated user's name.

***function authenticateToken(req, res, next){ ... }:***

Middleware function to authenticate the token.

***const authHeader = req.headers['authorization']:***

Gets the authorization header from the request.

***const token = authHeader && authHeader.split(' ')[1]:***

Extracts the token from the authorization header.

***if (token == null) return res.sendStatus(401):***

Returns a 401 status if no token is provided.

***jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { ... }):***

Verifies the token. If valid, attaches the user to req.user and calls next() to proceed to the route handler.


### How They Work Together
authServer.js handles the authentication logic:

Users can log in and receive access and refresh tokens.
Access tokens are used for immediate authentication.
Refresh tokens can be used to obtain new access tokens when the old ones expire.
Users can log out, which invalidates their refresh token.
server.js uses the access tokens for authentication:

It has a protected route (/posts) that requires a valid access token to access.
The authenticateToken middleware verifies the access token before allowing access to the posts.
In summary, authServer.js is responsible for issuing and managing tokens, while server.js uses these tokens to protect routes and ensure only authenticated users can access certain data.
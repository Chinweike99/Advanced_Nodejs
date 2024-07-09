const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

/*To harsh a password we need two steps:
1. Create a bcrypt.genSalt.
2. use the salt along with the password to create a hashed password*/

app.use(express.json())
const port = 3000;
const users = [];

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(req.body.password, 10)
        console.log(salt);
        console.log(hashedPwd)
        const user =  { name: req.body.name, password: hashedPwd}
        users.push(user);
        res.status(201).send("USER HAS BEEN CREATED");
    } catch{
        res.sendStatus(500).send("An error occured")
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if(user == null){
        return res.status(400).send('User does not exist');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("SUCCESS")
        }else{
            res.send("ERROR")
        }
    }catch{
        res.status(500).send();
    }
})

app.listen(port, ()=>{
    console.log(`Server running on PORT ${port}`)
})
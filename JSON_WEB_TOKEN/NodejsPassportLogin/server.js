const express = require('express');
const app = express();

const port = 3400;



app. listen(port, ()=>{
    console.log(`Listening to PORT ${port}`)
})
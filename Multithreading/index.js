const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
    res.status(200).send("This page is non-blcoking page");
});

app.get('/blocking', (req, res) => {
    const worker = new Worker("./worker.js");
    worker.on("message", (data)=>{
        res.status(200).send(`result is ${data}`)
    });
    worker.on("error", (eror) => {
        res.status(404).send(`Error: ${error}`);
    });
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
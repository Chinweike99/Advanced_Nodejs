const WorkerPool = require('./workerPool');

const pool = new WorkerPool(4);

for (let i = 0; i < 10; i++){
    pool.run(40, (err, result) => {
        if (err){
            console.error('Error', err);
        }else{
            console.log(`Result: ${result}`);
        }
    });
}
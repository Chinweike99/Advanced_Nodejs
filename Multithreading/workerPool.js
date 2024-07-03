const { Worker } = require('worker_threads');
const os = require('os');

const numCPUs = os.cpus().length;

class WorkerPool {
    constructor(numThreads){
        this.numThreads = numThreads;
        this.workers = [];
        this.queue = [];

        for (let i = 0; i < numThreads; i++){
            this.addworker();
        }
    }

    addworker(){
        const worker = new Worker('./worker.js');
        worker.on('message', (message) => {
            const callback = worker.callback;
            worker.callback = null;
            callback(null, message);

            if(this.queue.length > 0){
                const task = this.queue.shift();
                this.run(task.data, task.callback);
            } else {
                this.workers.push(worker);
            }
        });
        worker.on('error', (err)=>{
            const callback = worker.callback;
            if (callback) callback(err, null);
            else console.error(`Worker error: `, err);
        })

        worker.on('exit', (code)=> {
            if(code !== 0){
                console.error(`Worker stopped with exit code: ${code}`)
            }
        });
        this.workers.push(worker);        
    }

    run(data, callback){
        if(this.workers.length > 0){
            const worker = this.workers.pop();
            worker.callback = callback;
            worker.postMessage(data);
        } else{
            this.queue.push({data, callback});
        }
    }
}

module.exports = WorkerPool;
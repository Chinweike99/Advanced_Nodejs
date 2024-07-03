/* A more detailed example that includes passing data between
the main thread and worker thread */

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread){
    // This code is executed in the main thread and creates a worker
    const worker = new Worker(__filename, {
        workerData: {num : 40 }
    });
    worker.on('message', (message) => {
        console.log(`Recieved from worker: ${message.result}`);
    });

    worker.on('error', (error)=> {
        console.error('Worker error: ', error);
    });

    worker.on('exit', (code) => {
        if (code !== 0){
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
} else {
    // Exexuting the worker thread
    const computeFibonacci= (num) => {
        if (num <= 1) return num;
        return computeFibonacci(num - 1) + computeFibonacci (num - 2);
    };

    const result = computeFibonacci(workerData.num);
    parentPort.postMessage({result});
}
/*Basic example demonstrating how to use worker_threads module to  perform CPU-bound
task in a separate threadId.*/

const { Worker, isMainThread, parentPort, threadId } = require('worker_threads');
if (isMainThread) {
    // This code is exexuted as main thread and creates a worker
    const worker = new Worker(__filename);

    worker.on("message", (message) => {
        console.log(`Recieved from worker: ${message}`);
    });

    worker.on('error', (error)=>{
        console.error("Worker error:", error);
    });

    worker.on('exit', (code)=>{
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
}else {
    // This code is executed in the worker thread
    const computeFibonacci = (num) => {
        if (num <= 1) return num;
        return computeFibonacci(num - 1) + computeFibonacci (num - 2);
    };

    const result = computeFibonacci(40);
    parentPort.postMessage(result);
}
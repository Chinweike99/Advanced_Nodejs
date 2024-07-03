const { parentPort } = require('worker_threads');

parentPort.on('message', (num)=> {
    const computeFibonacci = (num) => {
        if (num <= 1) return num;
        return computeFibonacci(num - 1) + computeFibonacci(num - 2);
    };
    const result = computeFibonacci(num);
    parentPort.postMessage(result);
});
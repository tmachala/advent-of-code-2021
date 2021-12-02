const readline = require('readline');
const events = require('events');
const fs = require('fs');

class RingBuffer {
    constructor(length) {
        this.length = length;
        this.pointer = 0;
        this.array = new Array(length).fill(0);
        this.isFull = false;
    }

    push(val) {
        if (++this.pointer === this.length) {
            this.isFull = true;
            this.pointer = 0;
        }

        this.array[this.pointer] = val;
    }

    sum() {
        return this.array.reduce((a, b) => a + b, 0);
    } 
}

const ringBuffer = new RingBuffer(3);

let lastRunningSum = null;
let increaseCount = 0;

async function run() {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        console: false
    });

    readInterface.on('line', line => {
        const newDepth = parseInt(line);
        ringBuffer.push(newDepth);

        if (ringBuffer.isFull) {
            const newSum = ringBuffer.sum();

            if (lastRunningSum !== null && lastRunningSum < newSum) {
                increaseCount++;
            }

            lastRunningSum = newSum;
        }
    });

    await events.once(readInterface, 'close');
    console.log(increaseCount);
}

run();
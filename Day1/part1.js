const readline = require('readline');
const events = require('events');
const fs = require('fs');

let lastDepth = null;
let increaseCount = 0;

async function run() {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        console: false
    });

    readInterface.on('line', line => {
        const newDepth = parseInt(line);

        if (lastDepth !== null) {
            if (newDepth > lastDepth) {
                increaseCount++;
            }
        }

        lastDepth = newDepth;
    });

    await events.once(readInterface, 'close');
    console.log(increaseCount);
}

run();
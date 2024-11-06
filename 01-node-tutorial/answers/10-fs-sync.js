const { log } = require('console');
const { readFileSync, writeFileSync } = require('fs');

const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

for (let i = 0; i < 3; i++) {
    writeFileSync(
        './temporary/fileA.txt',
        `Here is the result: ${first}, ${second}`,  
        {flag: 'a'}
    )
}

console.log(first)
console.log(second)
console.log(`Here is the result ${first}, ${second}`)

console.log('done with this task')
console.log('starting the next one')
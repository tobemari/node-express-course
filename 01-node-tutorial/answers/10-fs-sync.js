
const { readFileSync, writeFileSync } = require('fs')

for (let i = 0; i < 3; i++) {
    writeFileSync(
        './temporary/fileA.txt',
        `This is line ${i + 1}\n`,
        { flag: 'a' }
    )
}

console.log(readFileSync('./temporary/fileA.txt', 'utf8')); 
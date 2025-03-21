
const { readFileSync, writeFileSync } = require('fs')

writeFileSync(
    './temporary/fileA.txt',
    `This is line 1\n`,
)

for (let i = 1; i < 3; i++) {
    writeFileSync(
        './temporary/fileA.txt',
        `This is line ${i + 1}\n`,
        { flag: 'a' }
    )
}

console.log(readFileSync('./temporary/fileA.txt', 'utf8')); ``
const { createReadStream } = require('fs');

const stream = createReadStream('../content/big.txt', { highWaterMark: 200, encoding: 'utf8' })

let chunkCount = 0;

stream.on('data', (result) => {
    chunkCount++;
    console.log(result);
    console.log(`Received ${chunkCount} chunks`)
})

stream.on('end', () => {
    console.log(`Stream ended. Total chunks received: ${chunkCount}`);
});

stream.on('error', (err) => console.log(err))

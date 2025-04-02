const { readFile, writeFile } = require('fs').promises

writeFile('./content/temp.txt', `THIS IS 1 LINE OF CODE\n`)
    .then(() => {
        console.log('Start writing.');
    })
    .then(() => {
        return writeFile('./content/temp.txt', `THIS IS 2 LINE OF CODE\n`, { flag: 'a' })
    })
    .then(() => {
        return writeFile('./content/temp.txt', `THIS IS 3 LINE OF CODE\n`, { flag: 'a' })
    })
    .then(() => {
        console.log('Start reading...');
    })
    .then(() => {
        return readFile('./content/temp.txt', 'utf8');
    })
    .then((data) => {
        console.log(data)
    })
    .then(() => {
        console.log('Finish reading...');
    })
    .catch((error) => {
        console.log("An error occurred: ", error)
    })  
const { writeFile, readFile } = require("fs").promises;

writeFile('./content/temp.txt',`This is line 1\n`)
    .then(() => {
        console.log('Start writing...');
    })    
    .then(() => {
        return writeFile (
            './content/temp.txt',
            `This is line 2\n`,
            {flag: 'a'} 
        )
    })
    .then(() => {
        return writeFile (
            './content/temp.txt',
            `This is line 3\n`,
            {flag: 'a'} 
        )
    })
    .then(() => {
        console.log('Start reading...');
    })  
    .then(() => {
        return readFile (
            './content/temp.txt',
            'utf8'
        )
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
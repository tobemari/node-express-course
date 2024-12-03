const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    console.log('Start writing...');
    try { 
        for ( let i = 0; i < 3; i++ ){
            await writeFile(
                './content/temp.txt',
                `This is line ${i+1}\n`,
                {flag: 'a'}
            )
            console.log(`Finished writing line ${i + 1}!`);
        }
    } catch (error) {
        console.log(error)
    }
    console.log('Doing other work...');
}

const reader = async () => {
    try {
       const content = await readFile('./content/temp.txt', 'utf8')
       console.log('Reading content: ', content);
    } catch (error) {
        console.log(error)
    }
    console.log('Reading completed!');
}

const readWrite = async () => {
    await writer(); 
    await reader(); 
}

readWrite();
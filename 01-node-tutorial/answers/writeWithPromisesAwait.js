const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        await writeFile('./content/temp.txt', `THIS IS 1 LINE OF CODE\n`);
        for (let i = 1; i < 3; i++) {
            await writeFile('./content/temp.txt', `THIS IS ${i + 1} LINE OF CODE\n`, { flag: 'a' })
        }
    } catch (error) {
        console.log('Writer error:', error)
    }
}

const reader = async () => {
    try {
        const content = await readFile('./content/temp.txt', 'utf8');
        console.log(content)
    } catch (error) {
        console.log('Reader error:', error)
    }
}

const readWrite = async () => {
    await writer();
    await reader();
}

readWrite()
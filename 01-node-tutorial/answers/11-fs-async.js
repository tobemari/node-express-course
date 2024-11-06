const { writeFile } = require('fs');
console.log('at start');
writeFile('./temporary/fileB.txt', 'This is line 1\n', (err, result)=>{
    console.log('at point 1');
    if(err){
        console.log('This error happened: ', err);
    } else {
        console.log('at point 2')  
        writeFile('./temporary/fileB.txt', 'This is line 2\n', {flag: 'a'}, (err, result)=>{
            console.log('at point 3');
            if(err){
                console.log('This error happened: ', err);    
            } else {
                console.log('at point 4')  
                writeFile('./temporary/fileB.txt', 'This is line 3\n', {flag: 'a'}, (err, result)=>{
                    console.log('at point 5')
                    if (err) {
                        console.log('This error happend: ', err)
                    } else {
                        console.log('at point 6')
                    }
                })
            }
        })
    }
})
console.log('at end')

const EventEmitter = require('events');

const customEmitter = new EventEmitter()

setInterval(() => {
    customEmitter.emit('timer', 'hi there');
}, 2000);

customEmitter.on('timer', (msg) => {
    console.log(msg)
})

customEmitter.on('response', () => {
    console.log(`some logic here`)
})

customEmitter.emit('response')

const waitForEvent = () => {
    return new Promise((resolve) => {
        customEmitter.on("happens", (msg) => resolve(msg));
    });
};
const doWait = async () => {
    const msg = await waitForEvent();
    console.log("We got an event! Here it is: ", msg);
};
doWait();
customEmitter.emit("happens", "Hello World!");  
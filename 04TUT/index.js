const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
// initialize the object
const myEmitter = new MyEmitter();
// add listner or the log event
myEmitter.on("logs", (msg) => logEvents(msg));
setTimeout(() => {
  myEmitter.emit("logs", "log event emitted");
}, 5000);

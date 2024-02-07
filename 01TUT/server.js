const os = require("os");
const path = require("path");

// 5 and 6 line are same
const math = require("./math");
// const { addition } = require("./math");
const { addition, subtract, divide, multiply } = require("./math");

console.log(math.addition(2, 5));
console.log(addition(3, 5));
console.log(subtract(3, 5));
console.log(divide(3, 5));
console.log(multiply(3, 5));

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

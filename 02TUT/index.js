const fs = require("fs");
const path = require("path");
fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
  // fs.readFile(
  //   path.join(__dirname, "files", "starter.text"),
  //   "utf-8",
  //   (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data.toString());
  }
});

console.log("hello.");

fs.writeFile("./files/reply.txt", "Nice to meet you .", (err) => {
  if (err) {
    throw err;
  } else {
    console.log("write complete");
  }
});

fs.writeFile("./files/test.txt", "Testing text .", (err) => {
  if (err) {
    throw err;
  } else {
    console.log("append complete");
  }
});

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error : ${err}`);
  process.exit(1);
});

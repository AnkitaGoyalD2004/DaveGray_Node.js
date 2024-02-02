const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf-8",
  (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
    }
  }
);

console.log("hello");

//big callback hell,to escape use promises
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you ",
  (err) => {
    if (err) throw err;
    console.log("write complete");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\n Yes it is .",
      (err) => {
        if (err) throw err;
        console.log("Appended");
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("renamed");
          }
        );
      }
    );
  }
);
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error : ${err}`);
  process.exit(1);
});

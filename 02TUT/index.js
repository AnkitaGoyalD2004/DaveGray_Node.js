const fs = require("fs");

fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data.toString());
  }
});
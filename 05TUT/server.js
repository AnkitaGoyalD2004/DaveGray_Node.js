const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
// initialize the object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // let path;
  // switch (req.url) {
  //   case "/":
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html");
  //     path = path.join(__dirname, "views", " index.html");
  //     fs.readFile(path, "utf-8", (err, data) => {
  //       res.end(data);
  //     });
  //     break;
  // }

  const extension = path.extname(req.url);
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".jpg":
      contentType = "image/jpg";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);
  //makes the html extensions not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    // serve the file
  } else {
    //404
    //301 redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.write(301, { Location: "/new-page.html" });
    }
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
// // add listner or the log event
// myEmitter.on("logs", (msg) => logEvents(msg));
// setTimeout(() => {
//   //Emit events
//   myEmitter.emit("logs", "log event emitted");
// }, 5000);

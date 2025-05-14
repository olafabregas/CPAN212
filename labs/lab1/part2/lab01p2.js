import http from "http";
import fs from "fs"; // file system.

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // do something
    return res.end("Hello World from Olamide!!!");
  } else if (req.url === "/contact") {
    // do something
    const data = fs.readFileSync("./contact.html");
    return res.end(data);
  } else if (req.url === "/methods") {
    // do something
    if (req.method === "GET") {
      // check if the request method is GET
      return res.end("You are using GET method");
    }
    if (req.method === "PUT") {
      //create / store information
      if (req.method === "POST") {
        return res.end("You are using POST method");
      }
      if (req.method === "PUT") {
        //update information
        return res.end("You are using PUT method");
      } else {
        res.writeHead(404, "ERROR");
        return res.end("404 page Not Found");
      }
    }
  } else {
    res.writeHead(404, "ERROR");
    return res.end("404 page Not Found");
  }
});

server.listen(8000, () => {
  console.log("http://localhost:8000");
});

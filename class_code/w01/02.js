import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == "/") {
    return res.end("Hello from Olamide");
  } else if (req.url == "/about") {
    return res.end("Hi Fabregas");
  }
  return res.end("I am Akorede");
});

server.listen(8000, () => {
  console.log("http://localhost:8000");
});

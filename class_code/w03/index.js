import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Olamide Server!");
});

app.post("/", (req, res) => {
  res.send("Hello from POST Server!");
});

app.put("/", (req, res) => {
  res.send("Hello from PUT Server!");
});

//Domain: https://www.youtube.com
//
//
//Endpoint: /watch
//?: Query Object


/* req: {
    IP,
    OS
    url
    method
    query (?)
} 

*/

app.get("/watch", (req, res) => {
  console.log(req.url);
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);
   res.send("You got the watch endoint!");
});

// for params
app.get("/params/:itemID", (req, res) => {
  console.log(req.url);                                        
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);
   res.send("You got to the params endoint!");
});
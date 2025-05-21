import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // do something
  res.send("Hello to the lab router!");
});

router.get("/name", (req, res) => {
  res.send("Fabregas");
});

router.get("/greeting", (req, res) => {
  res.send("Olamide Fabregas says Hi !!!");
});

router.get("/add/:x/:y", (req, res) => {
  let x = parseFloat(req.params.x);
  let y = parseFloat(req.params.y);
  let sum = x + y;
  res.send(`The sum of ${x} and ${y} is ${sum}`);
});

router.get("/calculate/:x/:y/:operator", (req, res) => {
  let x = parseFloat(req.params.x);
  let y = parseFloat(req.params.y);
  console.log(req.params.operator);

  switch (req.params.operator) {
    case "+":
      res.send(`${x + y}`);
      break;

    case "-":
      res.send(`${x - y}`);
      break;

    case "*":
      res.send(`${x * y}`);
      break;

    case "/": // %2F
      if (y != 0) {
        return res.send(`${x / y}`);
      }
      res.send("your denominator cannot be 0");
      break;
  }
});

export default router;

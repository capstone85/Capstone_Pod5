const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 5173;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); //json middleware needed to send json to post

app.get("/", (req, res, next) => {
  const a = null;
  console.log("fail");
  try {
    a.map();
  } catch (e) {
    const newError = new Error("Map failed");
    throw newError;
  }
  res.send("Fail!!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ world: "Hello" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

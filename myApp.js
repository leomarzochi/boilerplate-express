require("dotenv").config();

let express = require("express");
let app = express();
let path = require("path");
var bodyParser = require("body-parser");

console.log("Hello World");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip} `);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ word: req.params.word });
});

app
  .route("/name")
  .post((req, res) => {
    console.log(req);
    let name = req.body.first + " " + req.body.last;
    res.json({ name: name });
  })
  .get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
  });

const type = process.env.MESSAGE_STYLE;

let json = { message: "Hello json" };
if (type === "uppercase") {
  json = { message: "Hello json".toUpperCase() };
}

app.get("/json", (req, res) => {
  res.json(json);
});

module.exports = app;

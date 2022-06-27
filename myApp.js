let express = require("express");
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public/styles.css"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if ((process.env.MESSAGE_STYLE = "uppercase")) {
    res.json({ message: "Hello json".toUpperCase() });
  }
  res.json({ message: "Hello json" });
});

module.exports = app;

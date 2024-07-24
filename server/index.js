const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const Connection=require("./database/db.js");
const Routes=require("./routes/route.js");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes);
app.use("/files", express.static(path.join(__dirname, "Resume")));
app.use("/documents", express.static(path.join(__dirname, "Documents")));

const PORT = 8000;

Connection();

app.listen(PORT, () =>
  console.log(`Your server is running successfully on PORT ${PORT}`)
);

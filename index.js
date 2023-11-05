const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getData, getOrder } = require("./model/data"); // Import the getData function

const app = express();
const port = 1234;
const path = require("path");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
// var corsOptions = {
//   origin: "http://localhost:3000/",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.get("/search", getData); // Use getData as middleware for the /search route
app.post("/order", getOrder);
app.listen(port, () => {
  console.log("Server running @", port);
});

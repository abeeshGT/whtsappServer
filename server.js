const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
dotenv.config();
const database = require("./src/config/db");
const userRoute = require("./src/routes/v1/userRoute");
const messageRoute = require("./src/routes/v1/messageRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/v1/user", userRoute);
app.use("/v1/message", messageRoute);

database();
app.listen(5000, () => console.log("server started on PORT " + 5000));

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
dotenv.config();
const database = require("./src/config/db");

//=== IMPORT ROUTES ===
const userRoute = require("./src/routes/v1/userRoute");
const messageRoute = require("./src/routes/v1/messageRoute");
const webhooksRoute = require("./src/routes/v1/webhooksRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
   cors({
      origin: ["http://localhost:3000"],
   })
);

//==== ROUTES ===
app.use("/v1/user", userRoute);
app.use("/v1/message", messageRoute);
app.use("/v1/whatsapp", webhooksRoute);

database();
app.listen(process.env.PORT, () =>
   console.log("server started on PORT " + process.env.PORT)
);

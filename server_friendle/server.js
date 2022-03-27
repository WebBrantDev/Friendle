require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Routes
const signupRoute = require("./routes/signup");
const createTeamRoute = require("./routes/createTeam");
const addEntryRoute = require("./routes/addEntry");

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/signup", signupRoute);
app.use("/createTeam", createTeamRoute);
app.use("/addEntry", addEntryRoute);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${SERVER_PORT}`);
});

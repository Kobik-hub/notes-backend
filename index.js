const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");

//Import routes
const notes = require("./routes/notes");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined ");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection failed…"));

app.use(express.json());
app.use(cors());
app.use("/api/notes", notes);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
app.listen(port, host, () => console.log(`listening on port ${port}...`));

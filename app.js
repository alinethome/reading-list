const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(error => console.log(error))


app.get("/", (req, res) => res.send("Hello world!"));
app.listen(port, () => console.log(`Server is running on port ${port}`));

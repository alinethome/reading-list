const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000

const users = require("./routes/api/users");

const app = express();
const db = require("./config/keys").mongoURI;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(error => console.log(error))

app.use("/api/users", users);

app.listen(port, () => console.log(`Server is running on port ${port}`));

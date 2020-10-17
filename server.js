const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
 const mongodburl = process.env.url;

mongoose
  .connect(mongodburl)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err)),{ useNewUrlParser: true };

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use("/api/users",require("./routes/user"));
app.use("/api/images",require("./routes/image"));

app.listen(port,()=>{
  console.log("server started...");
})

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const mongodburl = process.env.MONGODB_URI||"mongodb+srv://user:12345@cluster0.70k9n.gcp.mongodb.net/image_uploader?retryWrites=true&w=majority";

mongoose
  .connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use("/api/users",require("./routes/user"));
app.use("/api/images",require("./routes/image"));

app.listen(port,()=>{
  console.log("server started...");
})

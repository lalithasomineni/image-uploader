const express = require("express");
const bodyparser = require("body-parser");
const app = express();
//const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//const YAML = require("yamljs");
const swaggerDocument = require('./swagger.json');
//const port = process.env.port||3000;
const mongoose = require("mongoose");
const mongodburl = process.env.mongodburl||"mongodb+srv://user:12345@cluster0.mmisy.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose
  .connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/users",require("./routes/user"));
app.use("/api/images",require("./routes/image"));

app.listen(process.env.PORT || 5000,()=>{
  console.log("server started...");
})

app.get("/",(req,res)=>{
  res.send("working...")
})

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
var url = process.env.DB_CONNECT_URL || "mongodb://localhost:27017/MERN_App";

mongoose.connect(url,{ useNewUrlParser: true,
  useUnifiedTopology: true,useCreateIndex: true });
mongoose.connection.on('connected',()=>{
  console.log("Connected to database");
})
mongoose.connection.on('error',(err)=>{
  console.error(`Failed to connected to the database: ${err}`)
})
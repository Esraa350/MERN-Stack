const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const logger=require("morgan");
const bodyParser=require('body-parser');

const userRoute=require('./Routes/user');
const app=express();


//---------- DB Config ----------//
require("./boot/DBConnection");
//---------- Middlewares ----------//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//---------- Routes ----------//
app.use("/user",userRoute);

//---------- Errors ----------//
app.use((req,res,next)=>{
   res.status(404).send({
      message:'not found'
   })
})

module.exports=app;
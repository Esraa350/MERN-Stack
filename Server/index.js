const express=require('express');
const router =express.Router();

const dotenv=require('dotenv');
dotenv.config();
const app=express();
const PORT = 4100;

app.listen(PORT,()=>{
    console.log(`Server on port ${PORT} `);
})
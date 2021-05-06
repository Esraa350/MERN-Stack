const express=require('express');
const router=express.Router();

const UserController=require('../Controllers/users.controllers');


//Auth sign Up
router.post('/register',UserController.register);

module.exports=router;
const express=require('express');
const router=express.Router();
const passport=require('passport');
const UserController=require('../Controllers/users.controllers');


//Auth sign Up
router.post('/register',UserController.register);
router.post('/auth',UserController.login);

///customize and protect the routes

router.all('*',(req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user)=>{
        if(err || !user){
            return res.status(401).send({ error: "Unauthorized action" });
        }
        req.user=user;
        return next();
    })(req,res,next);
})

// --------- protected Routes -------//
router.get('/expense',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    return res.send({message:'hi you are authanticated'})
})
module.exports=router;
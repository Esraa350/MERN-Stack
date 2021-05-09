const JWTStrategy=require("passport-jwt").Strategy;
const Extractjwt=require('passport-jwt').ExtractJwt;

const User=require('../Models/user.model');

module.exports=(passport)=>{
    let config={};
    config.secretOrKey=process.env.JWT_SECRET;
    config.jwtFromRequest=Extractjwt.fromAuthHeaderAsBearerToken();

    passport.use(new JWTStrategy(config,async(jwtPayload,done)=>{
        try{
            console.log({jwtPayload});
          const user=await User.findById(jwtPayload._id);
          if(user){
              return done(null,user);
          }else{
              return done(null,false);
          }
        }catch(e){
             return done(e,false);
        }
    }))
}
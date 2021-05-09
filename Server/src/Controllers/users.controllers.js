const jwt=require('jsonwebtoken');
const User = require('../Models/user.model');
const bcrypt=require('bcryptjs');
const UserController = {}

UserController.register = async (req, res, next) => {
    const { username, email, password, joined } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            res.status(400);
            return res.send({ error: "User already exists" });
        }
        const newUser = new User({
            username,
            email,
            password,
            joined
        });
          user = await newUser.save();
        return res.send({ user });
    } catch (err) {
        res.status(500);

        return res.send({ error: "server error" });
    }
}
UserController.login=async(req,res,next)=>{
    //username,password request
    const {email,password }=req.body;
    //check username and password
     try{
        let user = await User.findOne({ email});
        if (!user) {
          res.status(401);
          return res.json({ errors: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(401);
          return res.json({ errors: "Invalid password" });
        }
        //of ok,then create JWT as Stateless
        else{
            const secret=process.env.JWT_SECRET;
            const expire=process.env.JWT_EXPIRATION;

            const token=jwt.sign({_id:user._id},secret,{expiresIn:expire});
            return res.send({token});
            
        }
     }catch(e){
         next(e)
     }
    
};
module.exports = UserController;
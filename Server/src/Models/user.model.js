const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,index:true,unique:true },
    password: { type: String, required: true },
    joined:{type:Date,default:new Date()}
  });

UserSchema.pre('save',async function(next){
    //check new account or modified password
    if(!this.isModified('password')){
        return next();
    }
    //Encrypt
    try{
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(this.password,salt);
        this.password=hash;
        next();
    }catch(e){
        return next(e);
    }
    // bcrypt.genSalt(10,(err,salt)=>{

    // })
})
  
module.exports = mongoose.model("User", UserSchema);
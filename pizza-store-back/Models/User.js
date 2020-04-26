const mongoose =require('mongoose');
const  UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:{type:String ,required:true},
    lname:{type:String ,required:false},
    IsAdmin:{type:Boolean ,default:false},
    email:{type:String ,required:true},
    Password:{type:String ,required:true},
});
module.exports=mongoose.model('User',UserSchema);
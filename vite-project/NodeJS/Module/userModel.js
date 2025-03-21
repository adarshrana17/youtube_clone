import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  dateOfBirth:{
    type:Date,
    required:true,
  },
  mobile:{
    type:String,
    required:true,
  },
  profileImage:{
    type:String,
    required: false,
  }
  
})

const userModel = mongoose.model("registered_users",userSchema);

export default userModel;
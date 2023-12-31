import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        },
        avatar:
        { 
            type: String,
            default: "https://res.cloudinary.com/dq7l8216n/image/upload/v1628074949/avatars/avatar-1_fsuqyj.png"
           
        },  

        
    
    },
    { timestamps: true }
    );
//create a model
const User = mongoose.model("User", userSchema);
export default User;


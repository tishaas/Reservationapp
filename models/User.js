import mongoose from 'mongoose'
const {Schema} = mongoose

const UserSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },country: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        default:""
      },
      city: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    isAdmin:{
        type:Boolean,
        default:false
    },Token:{
        type:String,
        required:true
}
},{timestamps:true})

export default mongoose.model("User",UserSchema)
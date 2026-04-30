import mongoose, { mongo } from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    Password:{type:String}
})

export default mongoose.models.Users||mongoose.model('Users', UserSchema)
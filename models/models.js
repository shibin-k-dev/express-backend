import mongoose, { mongo } from "mongoose";
const DataSchema = new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    image:{type:String},
    userid:{type:String}

})

export default mongoose.models.Datas||mongoose.model('Datas', DataSchema)
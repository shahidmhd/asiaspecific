
const mongoose = require("mongoose")

const NewsSchema = new mongoose.Schema({
    News_Heading:{
        type:String,
        required:true
    },
    News_Description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
})
const NewsAndUpdates = mongoose.model('NewsAndUpdates',NewsSchema)
module.exports=NewsAndUpdates;
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    phone:{
        type:String
    },

})
const Phone = mongoose.model('phone', ContactSchema);

module.exports = Phone;
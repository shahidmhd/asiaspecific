const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    place:{
        type:String
    },
    message:{
        type:String
    },
})
const Contact = mongoose.model('Contactform', ContactSchema);

module.exports = Contact;
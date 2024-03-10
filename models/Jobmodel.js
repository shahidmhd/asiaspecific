const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
 
  location: {
    type: String,
    required: true
  },
  salary:{
   type:String,
   required:true
  },
  workingday: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  Skills: {
    type: [String], 
    default: []
},
 
  description: {
    type: String,
    required: true
  },
  companyname1: {
    type: String,
 
  },

  companydescription1: {
    type: String,

  },

  companyname2: {
    type: String,

  },

  companydescription2: {
    type: String,
    
  },
  
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;

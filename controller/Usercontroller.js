const Service = require("../models/Servicemodel");
const Continent = require('../models/Countriemodel');
const Job = require("../models/Jobmodel");
const User = require("../models/UserSchema");


const Renderhome =async (req,res)=>{
    const services = await Service.find();
    const continent=await Continent.find()
    res.render('user/Home',{services: services ,continent});
}
const Rendersuccess=async (req,res)=>{
    const services = await Service.find();
    const continent=await Continent.find()
    res.render('user/Success',{services: services ,continent});
}

const Renderjobs=async (req,res)=>{
    try {
        const slug = req.params.slug;
        const jobs = await Job.find({location: slug });
        console.log(jobs,"iiiii");
        const services = await Service.find();
    const continent=await Continent.find()
    res.render('user/Job',{services: services ,continent,jobs})
    } catch (error) {
        
    }
}
const Renderjobdetail=async (req,res)=>{
    try {
        const slug = req.params.slug;
    
        const jobs = await Job.findOne({_id: slug });
        console.log(jobs,"ddd");
        const services = await Service.find();
    const continent=await Continent.find()
    res.render('user/Jobdetail',{services: services ,continent,jobs})
    } catch (error) {
        
    }
}

const applyjob=async (req,res)=>{
    try {
        // Assuming req.body contains the necessary user data
        const userData = req.body;
        // Create a new instance of the User model
        const newUser = new User(userData);
    
        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log('User saved to database:', savedUser);
        res.redirect('/success',);
      
      } catch (error) {
        console.error('Error saving user to database:', error);
        // Handle the error and render an appropriate response
        res.render('errorPage', { error: 'Error saving user. Please try again.' });
      }
}

const Renderservice =async (req,res)=>{
try {
    const slug = req.params.slug;
    const service = await Service.findOne({ slug });
    const services = await Service.find();
    const continent=await Continent.find()
    res.render('user/Service',{services: services ,service,continent});
} catch (error) {
      // Handle other errors
      console.error('Error fetching service:', error);
      res.status(500).render('error', { message: 'Internal Server Error' });
}
}
// const Renderservice = async (req, res) => {
//     try {
  
//         const services = await Service.find();

      

//         // Render the template for displaying the individual service
//         res.render('user/Service',{services});
//     } catch (error) {
//         // Handle other errors
//         console.error('Error fetching service:', error);
//         res.status(500).render('error', { message: 'Internal Server Error' });
//     }
// };

module.exports = {
    Renderhome,
    Renderservice,
    Renderjobs,
    Renderjobdetail,
    applyjob,
    Rendersuccess
};

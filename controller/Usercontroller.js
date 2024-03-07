const Service = require("../models/Servicemodel");
const Continent = require('../models/Countriemodel');
const Job = require("../models/Jobmodel");
const User = require("../models/UserSchema");
const NewsAndUpdates = require("../models/New&updates");


const Renderhome =async (req,res)=>{
    const services = await Service.find();
    const continent=await Continent.find()
    const News = await NewsAndUpdates.find()
    const Jobs = await Job.find();
    res.render('user/Home',{services: services ,continent,News,Jobs});
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

const GetAppliedJobs = async(req,res)=>{
    try {
        const data = await User.find().populate('jobId');;
        console.log(data);
        res.render("admin/Appliedjob",{ layout: 'adminlayout', data})
    } catch (error) {
        console.log(error);
    }
}
const RenderAbout=async (req,res)=>{
    try {
        
        
        const services = await Service.find();
        const continent=await Continent.find()
        res.render('user/About',{services: services ,continent});
    } catch (error) {
          // Handle other errors
          console.error('Error fetching service:', error);
          res.status(500).render('error', { message: 'Internal Server Error' });
    }
    }

    const RenderNews=async (req,res)=>{
        try {
            const News = await NewsAndUpdates.find();
            const services = await Service.find();
            const continent=await Continent.find()
            res.render('user/News',{services: services ,continent,News});
        } catch (error) {
              // Handle other errors
              console.error('Error fetching service:', error);
              res.status(500).render('error', { message: 'Internal Server Error' });
        }
        }
        const RenderContact=async (req,res)=>{
            try {
                const services = await Service.find();
                const continent=await Continent.find()
                res.render('user/Contact',{services: services ,continent});
            } catch (error) {
                  // Handle other errors
                  console.error('Error fetching service:', error);
                  res.status(500).render('error', { message: 'Internal Server Error' });
            }
            }

const Renderservice = async (req, res) => {
    try {
        const slug = req.params.slug;
        const service = await Service.findOne({ slug });
        const services = await Service.find();
        const continent = await Continent.find();

        // Determine the active service based on the slug
        const activeService = services.find(serv => serv.slug === slug);

        res.render('user/Service', { services, service, continent, activeService });
    } catch (error) {
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
    Rendersuccess,
    RenderAbout,
    GetAppliedJobs,
    RenderNews,
    RenderContact,
};

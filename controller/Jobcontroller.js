const axios = require('axios');
const Job = require('../models/Jobmodel');

const Addjob=async (req,res)=>{

   try {
     // Make a GET request to a countries API
     const response = await axios.get('https://restcountries.com/v3.1/all');
    
     // Extract the list of countries from the response
     const countries = response.data.map(country => country.name.common);
 
     // Sort the countries in ascending order
     const sortedCountries = countries.sort((a, b) => a.localeCompare(b));
     const jobdata = await Job.find();

    res.render('admin/Addjob',{ layout: 'adminlayout',countries: sortedCountries ,jobdata})
   } catch (error) {
    
   }
}

// const Addjobdata = async (req, res) => {
//     console.log(req.file,"tt");
//     console.log(req.body);
//        const skillsArray = req.body.Skills ? JSON.parse(req.body.Skills) : [];
//        console.log('Skills Array:', skillsArray);
//     try {
//         // Parse the selectedSkills array from the request body
//         const selectedSkills = JSON.parse(req.body.selectedSkills);
//         const fileData = req.file;
//         console.log(fileData,"hhhhhhhh");
//         // Assuming you have a Job model defined using Mongoose
//         const jobData = {
//             category: req.body.category,
//             jobType: req.body.jobType,
//             Email: req.body.Email,
//             vecancy: req.body.vecancy,
//             location: req.body.location,
//             experience: req.body.experience,
//             workingday: req.body.workingday,
//             Skills: req.body.Skills,
//             education: req.body.education,
//             description: req.body.description,
//             selectedSkills: selectedSkills,
//             image: fileData ? fileData.filename : null,
//             // Assuming you also have selectedEducations in your request body
//             selectedEducations: JSON.parse(req.body.selectedEducations)
//         };

//         // Create a new job instance using the Job model
//         const newJob = new Job(jobData);

//         // Save the job to the database
//         await newJob.save();

//         console.log('Job saved successfully:', newJob);

//         // You might want to send a response to the client
//         res.redirect('/admin/jobs');
//     } catch (error) {
//         console.error('Error processing form:', error);
//         res.status(500).json({ message: 'Error processing the form. Please try again.' });
//     }
// };
const Addjobdata = async (req, res) => {


    try {
    
        const fileData = req.file;
     
        // Create a new job instance using the Job model and populate it with the request data
        const newJob = new Job({
            category: req.body.category,
            location: req.body.location,
            workingday: req.body.workingday,
            image: fileData ? fileData.filename : null,
            Skills: req.body.Skills ? JSON.parse(req.body.Skills) : [],
            description: req.body.description,
            companyname1: req.body.companyname1,
            companydescription1: req.body.companydescription1,
            companyname2: req.body.companyname2,
            companydescription2: req.body.companydescription2,
            salary: req.body.salary,
            // Add other properties if needed
        });

        // Save the job to the database
        await newJob.save();

       

        // You might want to send a response to the client
        res.redirect('/admin/jobs');
    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).json({ message: 'Error processing the form. Please try again.' });
    }
};

const DeleteJob =async(req,res)=>{
    try {
        const { id } = req.params
        await Job.findByIdAndDelete({ _id: id });
        res.redirect('/admin/jobs')
    } catch (err) {
        console.log(err);
    }
}
const EditJob = async (req, res) => {

    try {
        const { id } = req.params;
        const updateFields = req.body;
        const fileData = req.file;

        // Ensure that only non-empty fields from the request body are considered for the update
        Object.keys(updateFields).forEach((key) => (updateFields[key] == null || updateFields[key] === "") && delete updateFields[key]);

        const olddata = await Job.findById(id);
        const oldimg = olddata.image;
        console.log(fileData ? fileData.filename : oldimg, "hhhhhhhhhhhhhhhai");

        const updatedJob = await Job.findOneAndUpdate(
            { _id: id },
            { ...updateFields, image: fileData ? fileData.filename : oldimg }, 
            { new: true }
        );

        if (!updatedJob) {
            // Handle case where the job is not found
            return res.status(404).json({ error: "Job not found" });
        }

        console.log("Job Updated Successfully");
        res.redirect('/admin/jobs');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {
    Addjob,
    Addjobdata,
   DeleteJob,
   EditJob
};

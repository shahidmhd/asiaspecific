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

const Addjobdata = async (req, res) => {
    try {
        // Parse the selectedSkills array from the request body
        const selectedSkills = JSON.parse(req.body.selectedSkills);

        // Assuming you have a Job model defined using Mongoose
        const jobData = {
            category: req.body.category,
            jobType: req.body.jobType,
            Email: req.body.Email,
            vecancy: req.body.vecancy,
            location: req.body.location,
            experience: req.body.experience,
            workingday: req.body.workingday,
            Skills: req.body.Skills,
            education: req.body.education,
            description: req.body.description,
            selectedSkills: selectedSkills,
            // Assuming you also have selectedEducations in your request body
            selectedEducations: JSON.parse(req.body.selectedEducations)
        };

        // Create a new job instance using the Job model
        const newJob = new Job(jobData);

        // Save the job to the database
        await newJob.save();

        console.log('Job saved successfully:', newJob);

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
        console.log(id);
        await Job.findByIdAndDelete({ _id: id });
        console.log("Job Deleted Sucessfully");
        res.redirect('/admin/jobs')
    } catch (err) {
        console.log(err);
    }
}
const EditJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Ensure that only non-empty fields from the request body are considered for the update
        Object.keys(updateFields).forEach((key) => (updateFields[key] == null || updateFields[key] === "") && delete updateFields[key]);

        const updatedJob = await Job.findOneAndUpdate({ _id: id }, updateFields, { new: true });

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

const axios = require('axios');

const Service = require("../models/Servicemodel");
const Continent = require('../models/Countriemodel');

const Renderservice =async (req,res)=>{
    res.render('admin/Service',{ layout: "adminlayout"})
}
const RenderCountries = async (req, res) => {
    try {
        // Make a GET request to a countries API
        const response = await axios.get('https://restcountries.com/v3.1/all');
    
        // Extract the list of countries from the response
        const countries = response.data.map(country => country.name.common);
        const Data = await Continent.find() 
        // Sort the countries in ascending order
        const sortedCountries = countries.sort((a, b) => a.localeCompare(b));
    
        // Render the view with the sorted list of countries
        res.render('admin/Countries', { layout: 'adminlayout', countries: sortedCountries, Data : Data});
    } catch (error) {
        console.error('Error fetching countries:', error);
    
        // Render an error view or handle the error accordingly
        res.render('error', { message: 'Error fetching countries' });
    }
    
};
const DeleteCountry = async(req,res)=>{
    try {
        const { id } = req.params
        console.log(id,"fhgsdfgdghfxg");
        await Continent.findByIdAndDelete({ _id: id });
        console.log("Country Deleted Sucessfully");
        res.redirect('/admin/Countries')
    } catch (err) {
        console.log(err);
    }
}
const Postcountries = async (req, res) => {
    try {
        const { continent, selectedCountries } = req.body;
    
        // Parse the selectedCountries string into a JavaScript array
        const countriesArray = JSON.parse(selectedCountries);
    
        // Create a new continent instance
        const newContinent = new Continent({
            continent: continent,
            countries: countriesArray,
        });
    
        // Save the new continent to the database
        const savedContinent = await newContinent.save();
        console.log(savedContinent, "Data saved successfully!");
    
        res.redirect('/admin/countries');
    } catch (error) {
        // Handle errors
        console.error('Error saving data to the database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
}


const Renderservicelist =async (req,res)=>{
    try {
        // Fetch all service data from the database
        const services = await Service.find();
        // Render the 'admin/Servicelist' page with the service data
        res.render('admin/Servicelist', { layout: 'adminlayout', services: services });
    } catch (error) {
        console.error('Error fetching service data:', error);
        res.status(500).send('Internal Server Error');
    }
}

const DeleteService =async(req,res)=>{
    try {
        const { id } = req.params
        console.log(id);
        await Service.findByIdAndDelete({ _id: id });
        console.log("Service Deleted Sucessfully");
        res.redirect('/admin/servicelist')
    } catch (err) {
        console.log(err);
    }
}
const Addservice =async (req,res)=>{
    try {
        // Access form data
        const { Service_Name, Service_Description, Main_Heading, About_Me } = req.body;

        // Access uploaded file data (if applicable)
        const fileData = req.file;
        console.log(Service_Name, Service_Description, Main_Heading, About_Me);
        console.log(fileData);

        // Create a new instance of the Service model
        const newService = new Service({
            Service_Name,
            Service_Description,
            Main_Heading,
            About_Me,
            image: fileData ? fileData.filename : null,
        });

        // Save the new service to the database
        await newService.save();

        // Render success message
        res.redirect('/admin/service');
    } catch (error) {
        console.error('Error processing form:', error);
        res.render('admin/service', { message: null, error: 'Error processing the form. Please try again.' });
    }
}
const EditService = async (req, res) => {
    try {
        const { id } = req.params;
        const { Service_Name, Service_Description, Main_Heading, About_Me } = req.body;

        const fileData = req.file;

        const olddata = await Service.findById(id);
        console.log(olddata);

        const oldimg = olddata.image;
        console.log(fileData ? fileData.filename : oldimg, "hhhhhhhhhhhhhhhai");

        const updateFields = {
            Service_Name,
            Service_Description,
            Main_Heading,
            About_Me,
            image: fileData ? fileData.filename : oldimg,
        };

        const updatedService = await Service.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
            { new: true } 
        );

        console.log(updatedService, "nnnnnnnnnnnnnnnnnnnnnnnne");

        if (updatedService) {
            console.log("Service edited successfully.");
            res.redirect('/admin/servicelist')
        } else {
            console.log("Service not found or not updated.");
            res.redirect('/admin/servicelist')
        }
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    Renderservice,
    Addservice,
    Renderservicelist,
    RenderCountries,
    Postcountries,
    DeleteCountry,
    DeleteService,
    EditService,
};

const Contact = require("../models/Contactform");


const AddContactForm = async (req, res) => {
    try {
        const data = req.body;
        console.log("ggggggggggggggg");

        // Assuming Contact is a model with a create method
        await Contact.create(data);
console.log(data);
console.log("Contact Form Added Sucessfully");

        // res.redirect('/about');
    } catch (error) {
        console.error(error);
        
    }
};
const GetContactForm = async(req,res)=>{
    try {
        const data = await Contact.find();
        res.render("admin/Contact",{ layout: 'adminlayout', data})
    } catch (error) {
        console.log(error);
    }
}
const Deletecontact =async(req,res)=>{
    try {
        const { id } = req.params
        console.log(id);
        await Contact.findByIdAndDelete({ _id: id });
        console.log("Contact Deleted Sucessfully");
        res.redirect('/admin/contact')
    } catch (err) {
        console.log(err);
    }
}

module.exports={
    AddContactForm,
    GetContactForm,
    Deletecontact,
}
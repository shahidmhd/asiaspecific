const Contact = require("../models/Contactform");
const Phone=require("../models/mobilemodel")

const AddContactForm = async (req, res) => {
    try {
        const data = req.body;


        // Assuming Contact is a model with a create method
        await Contact.create(data);


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

        await Contact.findByIdAndDelete({ _id: id });
        console.log("Contact Deleted Sucessfully");
        res.redirect('/admin/contact')
    } catch (err) {
        console.log(err);
    }
}
const Deletesubscriber =async(req,res)=>{
    try {
        const { id } = req.params

        await Phone.findByIdAndDelete({ _id: id });

        res.redirect('/admin/subscriptionlist')
    } catch (err) {
        console.log(err);
    }
}
const Addmobile = async (req, res) => {
    try {

        const newPhone = new Phone({ phone: req.body.phone });
        await newPhone.save();

        console.log('Mobile number saved:', newPhone);

        // You might want to send a response to the client
        res.status(200).json({ success: true, message: 'Mobile Number Added Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving the mobile number.' });
    }
};


module.exports={
    AddContactForm,
    GetContactForm,
    Deletecontact,
    Addmobile,
    Deletesubscriber
}
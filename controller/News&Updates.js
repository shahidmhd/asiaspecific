const NewsAndUpdates = require("../models/New&updates");


const RenderNewandUpdates =async (req,res)=>{
    try {
        // Fetch all service data from the database
        const News = await NewsAndUpdates.find();
        // Render the 'admin/Servicelist' page with the service data
        res.render('admin/New&Updates', { layout: 'adminlayout', News:News });
    } catch (error) {
        console.error('Error fetching service data:', error);
        res.status(500).send('Internal Server Error');
    }
}


const AddNewsAndUpdates =async (req,res)=>{
    try {
        // Access form data
        const {News_Heading, News_Description } = req.body;

        // Access uploaded file data (if applicable)
        const fileData = req.file;
        console.log(News_Heading,News_Description);
        console.log(fileData);

        // Create a new instance of the Service model
        const newNews = new NewsAndUpdates({
         News_Heading,
         News_Description,
         image: fileData ? fileData.filename : null,
        });

        // Save the new service to the database
        await newNews.save();

        // Render success message
        res.redirect('/admin/new&updates');
    } catch (error) {
        console.error('Error processing form:', error);
        res.render('admin/new&updates', { message: null, error: 'Error processing the form. Please try again.' });
    }
}
const DeleteNewsandUpdates = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id,"fhgsdfgdghfxg");
        await NewsAndUpdates.findByIdAndDelete({ _id: id });
        console.log("new&updates Deleted Sucessfully");
        res.redirect('/admin/new&updates')
    } catch (err) {
        console.log(err);
    }
}
const EditNewsandUpdates = async (req, res) => {
    try {
        const { id } = req.params;
        const { News_Heading, News_Description } = req.body;

        const fileData = req.file;

        const olddata = await NewsAndUpdates.findById(id);
        console.log(olddata);

        const oldimg = olddata.image;
        console.log(fileData ? fileData.filename : oldimg, "hhhhhhhhhhhhhhhai");

        const updateFields = {
            News_Heading,
            News_Description,
            image: fileData ? fileData.filename : oldimg,
        };

        const updatedNewandUpdates = await NewsAndUpdates.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
            { new: true } // Return the modified document
        );

        console.log(updatedNewandUpdates, "nnnnnnnnnnnnnnnnnnnnnnnne");

        if (updatedNewandUpdates) {
            console.log("News and Updates edited successfully.");
            res.redirect('/admin/new&updates');
        } else {
            console.log("News and Updates not found or not updated.");
            res.redirect('/admin/new&updates');
        }
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports={
    AddNewsAndUpdates,
    RenderNewandUpdates,
    DeleteNewsandUpdates,
    EditNewsandUpdates,
}
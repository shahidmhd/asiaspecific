// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//     Service_Name: {
//         type: String,
//         required: true,
//     },
//     Service_Description: {
//         type: String,
//         required: true,
//     },
//     Main_Heading: {
//         type: String,
//         required: true,
//     },
//     About_Me: {
//         type: String,
//         required: true,
//     },
//     image:{
//         type: String,
//         required: true,
//     }
// });

// const Service = mongoose.model('Service', serviceSchema);

// module.exports = Service;
const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema({
    Service_Name: {
        type: String,
        required: true,
    },
    Service_Description: {
        type: String,
        required: true,
    },
    Main_Heading: {
        type: String,
        required: true,
    },
    About_Me: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
});

// Middleware to automatically generate a slug before saving to the database
serviceSchema.pre('save', function (next) {
    this.slug = slugify(this.Service_Name, { lower: true });
    next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

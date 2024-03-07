const Service = require("../models/Servicemodel");
const Continent = require('../models/Countriemodel');

const RenderAbroad = async (req, res) => {
    try {
        const services = await Service.find();
        const continent = await Continent.find()
        res.render('user/Abroad', { services: services, continent})
    } catch (error) {

    }
}

module.exports = {
    RenderAbroad
};
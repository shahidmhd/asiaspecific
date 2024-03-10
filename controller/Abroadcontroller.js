const Service = require("../models/Servicemodel");
const Continent = require('../models/Countriemodel');

const RenderAbroad = async (req, res) => {
    try {
        req.session.show = false;
        const services = await Service.find();
        const continent = await Continent.find()
        res.render('user/Abroad', { services: services, continent,show: req.session.show})
    } catch (error) {

    }
}

module.exports = {
    RenderAbroad
};
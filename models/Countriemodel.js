const mongoose = require('mongoose');



const continentSchema = new mongoose.Schema({
  continent: {
    type: String,
    required: true,
  },
  countries: {
    type: [String],
    required: true,
  },
});

const Continent = mongoose.model('Continent', continentSchema);

module.exports = Continent;

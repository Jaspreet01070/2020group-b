const mongoose = require('mongoose');

var contestSchema = new mongoose.Schema({
    cName: {type: String, required: true},
    cPeriod: {type: Date, required: true},
    cStatus: {type: Boolean, required: true}
});

module.exports = mongoose.model("Contest", contestSchema);
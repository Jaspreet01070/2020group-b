const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({


    players : {type:String,required:false},
    wins :    {type:String,required:false},
    salary :  {type:String,required:false},
    captain: {type:String,required:false}
});

module.exports = mongoose.model("Players", playerSchema);
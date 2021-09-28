var express = require("express");
var app = express();
var port = 3001;
var bodyParser = require('body-parser');
var db = require('./db/connect');
var Contest = require('./db/models/contest-model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// to the home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/CreateContest.html");
});


// post the data
app.post("/", (req, res) => {

    let myContest = new Contest({
          cName: req.body.inputName,
          cPeriod: req.body.inputDate,
          cStatus: true
    });
    myContest.save()
        .then(doc=>{
            return res.status(201).send(doc)})
        .catch(err=>{
            return res.status(404).send(err)});
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');
var should = require('chai').should();
var chaiHttp = require("chai-http");
const {EmptyCheck} = require("../public/CreateContest");
const {app} = require('../index.js');
var jsdom = require('mocha-jsdom');
global.document = jsdom({url: "http://localhost:3001"});

chai.should();

chai.use(chaiHttp);

describe("Story 12. Create new contest", ()=> {

    describe("Admin input the contest info", ()=> {
        it("The contest name fields should not be null", ()=>{
            chai.assert.equal(EmptyCheck("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

        it("The contest name fields is null", ()=>{
            chai.assert.equal(EmptyCheck("", "2021-10-19T00:00:00.000+00:00"), false);
        });

        it("The contest date fields should not be null", ()=>{
            chai.assert.equal(EmptyCheck("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

        it("The contest date fields is null", ()=>{
            chai.assert.equal(EmptyCheck("The GrandMaster League test name", ""), false);
        });
    });

    describe("Admin submits the contest information", ()=> {
        it("All the text fields are fill", ()=>{
            chai.assert.equal(EmptyCheck("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

    });

    describe("Admin submits the contest period in the past", ()=> {
        it("The period is in the past", ()=>{
            chai.assert.equal(EmptyCheck("The GrandMaster League test name", "2021-01-18T00:00:00.000+00:00"), false);
        });

        it("The period is in the future", ()=>{
            chai.assert.equal(EmptyCheck("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

    });

    describe("Created contest info load into the database", ()=> {
        it("After the submission, the created contest information load into the database", ()=>{

            const contestTest = {
                cName: "The GrandMaster League test 1",
                cPeriod: "2021-10-19T00:00:00.000+00:00",
                cStatus: true
            };

            chai.request("http:/localhost:3001")
                .post("/")
                .send(contestTest)
                .end((err,res) =>
                {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.should.have.property("cName").eql("The GrandMaster League test 1");
                    res.body.should.have.property("cPeriod").eql("2021-10-19T00:00:00.000+00:00");
                    res.body.should.have.property("cStatus").eql(true);
                    done();
                });
        });

        it("After the submission, the created contest information didn't load into the database", ()=>{
            const contestTest = {
                cName: "The GrandMaster League test 2",
                cPeriod: "2021-11-30T00:00:00.000+00:00",
                cStatus: true
            };
            chai.request("http:/localhost:3001")
                .post("/errorPath")
                .send(contestTest)
                .end((err,res) =>
                {
                    res.should.have.status(404);
                    //res.body.should.be.a("object");
                    //res.body.should.have.property("cName").eql("The GrandMaster League test 2");
                    //res.body.should.have.property("cPeriod").eql("2021-11-30T00:00:00.000+00:00");
                    //res.body.should.have.property("cStatus").eql(true);
                    done();
                });
        });

    });

    describe("Admin creates the contest over 5 contests at the same time", ()=> {
        it("The contests create over 5 times", ()=>{
            EmptyCheck("The GrandMaster League test name 1", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck("The GrandMaster League test name 2", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck("The GrandMaster League test name 3", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck("The GrandMaster League test name 4", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck("The GrandMaster League test name 5", "2021-10-19T00:00:00.000+00:00");

            chai.assert.equal(EmptyCheck("The GrandMaster League test name 6", "2021-10-19T00:00:00.000+00:00"), false);
        });
    });

});
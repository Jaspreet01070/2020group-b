const chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
// let server = require("../app");
var jsdom = require('mocha-jsdom');
var should = require('chai').should;
const {EmptyCheck, onlyAlphabets, uniqueEmail, emailFormat, selectCountry, contactLength, contactContains, usernameContains, uniqueUsername, 
    usernameLength, passwordLength, passContainsAphabets, similarPassword, loginemail, loginpassword} = require("../app");
global.document = jsdom({ url:"http://localhost:3001"});

var addPlayers = require('../app').addPlayers;
const assert = require("chai").assert;


var expect  = require('chai').expect;
var request = require('request');
const {EmptyCheck1} = require("../public/js/CreateContest");
// const {app} = require('../app1.js');


// Assertion style
// chai.should();

chai.use(chaiHttp);

describe('User Story: 1 user create account', () => {

        describe("User Enters Firstname", () => {

            it("The firstname field should contain firstname", () => {
                chai.assert.equal(EmptyCheck("Ridham"), true);
            });

            it("The firstname field should not be null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The firstname field should only contain alphabets", () => {
                chai.assert.equal(onlyAlphabets("Ridham"), true);
            });

            it("The firstname field should not contain numbers", () => {
                chai.assert.equal(onlyAlphabets("Ridham123"), false);
            });

            it("The firstname field should not contain any special characters", () => {
                chai.assert.equal(onlyAlphabets("Ridham@123"), false);
            });
        });

        describe("User Enters Lasttname", () => {

            it("The lastname field should contain lastname", () => {
                chai.assert.equal(EmptyCheck("Gandhi"), true);
            });

            it("The lasttname field should not be null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The lastname field should only contain alphabets", () => {
                chai.assert.equal(onlyAlphabets("Gandhi"), true);
            });

            it("The lastname field should only contain alphabets", () => {
                chai.assert.equal(onlyAlphabets("Gandhi123"), false);
            });

            it("The lastname field should not contain any special characters", () => {
                chai.assert.equal(onlyAlphabets("Ridham@123"), false);
            });
        });

        describe("User Enters Email Address", () => {

            it("The Email field should not be null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The email should not exist in database", () => {
                chai.assert.equal(uniqueEmail("ridham1194@gmail.com"), false);
            });

            it("The email should only consist proper data", () => {
                chai.assert.equal(emailFormat("test123@gmail.com"), true);
            });

            it("The email can have hyphen, undescore, period in between", () => {
                chai.assert.equal(emailFormat("test_123@gmail.com"), true);
            });
        });

        describe("User select country from dropdown", () => {

            it("The country should not be left unselected null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The country selected from dropdown", () => {
                chai.assert.equal(selectCountry("canada"), true);
            });

            it("The country must be selected from dropdown", () => {
                chai.assert.equal(selectCountry("UAE"), false);
            });
        });

        describe("User enters the contact number", () => {

            it("The contact number field should not be left null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The contact number should be of 10 digits", () => {
                chai.assert.equal(contactLength("1122334455"), true);
            });

            it("The contact number can not exceed limit of 10 digits", () => {
                chai.assert.equal(contactLength("11223344555"), false);
            });

            it("The contact number can not be less than 10 digits", () => {
                chai.assert.equal(contactLength("112233445"), false);
            });

            it("The contact number can not have other character than numerics", () => {
                chai.assert.equal(contactContains("11BB3344AA"), false);
            });
        });

        describe("User enters the username", () => {

            it("The username field should not be left null", () => {
                chai.assert.equal(EmptyCheck("Ridham@12345"), true);
            });

            it("The username field left null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The username is unique", () => {
                chai.assert.equal(uniqueUsername("Test#@12345"), false);
            });

            it("The username field do not contains special characters", () => {
                chai.assert.equal(usernameContains("Ridham1111"), false);
            });
            it("The username field contains special characters", () => {
                chai.assert.equal(usernameContains("Ridham@12121"), true);
            });

            it("The username length is less than 10 characters", () => {
                chai.assert.equal(usernameLength("Test*233"), false);
            });

            it("The username length is of 20 characters", () => {
                chai.assert.equal(usernameLength("T@123e#123s_123t897*"), true);
            });

            it("The username length is greater than 20 characters", () => {
                chai.assert.equal(usernameLength("T@123e#123s_123t89756*"), false);
            });
        });

        describe("User enters the password", () => {

            it("The password field should not be left null", () => {
                chai.assert.equal(EmptyCheck("Ridham@12345"), true);
            });

            it("The password field left null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The password length is less than 8 characters", () => {
                chai.assert.equal(passwordLength("Test*23"), false);
            });

            it("The password length is of 8 characters", () => {
                chai.assert.equal(passwordLength("T@123e#123s_123t897*"), true);
            });

            it("The password length is greater than 8 characters", () => {
                chai.assert.equal(passwordLength("T@123e#123s_123t89756*"), true);
            });

            it("The password contain at least one uppercase alphabet", () => {
                chai.assert.equal(passContainsAphabets("Ridham@12345"), true);
            });

            it("The password do not contain single uppercase alphabet", () => {
                chai.assert.equal(passContainsAphabets("ridham@12345"), false);
            });

            it("The password contain at least one lowercase alphabet", () => {
                chai.assert.equal(passContainsAphabets("Ridham@12345"), true);
            });

            it("The password do not contain single lowercase alphabet", () => {
                chai.assert.equal(passContainsAphabets("RIDHAM@12345"), false);
            });
        });

        describe("User enters the confirm password", () => {

            it("The confirm password field should not be left null", () => {
                chai.assert.equal(EmptyCheck("Ridham@12345"), true);
            });

            it("The confirm password field left null", () => {
                chai.assert.equal(EmptyCheck(""), false);
            });

            it("The confirm password is similar to password field", () => {
                chai.assert.equal(similarPassword("Ridham@12345", "Ridham@12345"), true);
            });

            it("The confirm password different than password field", () => {
                chai.assert.equal(similarPassword("Ridham@12345", "Test@12345"), false);
            });
        });
});

describe('User Story: 2 user login', () => {
    describe("User enters email address", () => {
        it("The email field is not empty", () => {
            chai.assert.equal(EmptyCheck("Ridham1194@gmail.com"), true);
        });

        it("The email field left null", () => {
            chai.assert.equal(EmptyCheck(""), false);
        });

        it("The email field data is not present in database", () => {
            chai.assert.equal(loginemail("foram911@gmail.com"), false);
        });
    });
    
    describe("User enters password", () => {
        it("The password field is not empty", () => {
            chai.assert.equal(EmptyCheck("Ridham@12345"), true);
        });

        it("The password field left null", () => {
            chai.assert.equal(EmptyCheck(""), false);
        });

        it("The password is matching to the associated email present in database", () => {
            chai.assert.equal(loginpassword("Ridham@12345"), true);
        });
    });
});




// user story 12 : Create Contests
// Cheieh-Jung Lo and Daoye Zu


describe("Story 12. Create new contest", ()=> {

    describe("Admin input the contest info", ()=> {
        it("The contest name fields should not be null", ()=>{
            chai.assert.equal(EmptyCheck1("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

        it("The contest name fields is null", ()=>{
            chai.assert.equal(EmptyCheck1("", "2021-10-19T00:00:00.000+00:00"), false);
        });

        it("The contest date fields should not be null", ()=>{
            chai.assert.equal(EmptyCheck1("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

        it("The contest date fields is null", ()=>{
            chai.assert.equal(EmptyCheck1("The GrandMaster League test name", ""), false);
        });
    });

    describe("Admin submits the contest information", ()=> {
        it("All the text fields are fill", ()=>{
            chai.assert.equal(EmptyCheck1("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
        });

    });

    describe("Admin submits the contest period in the past", ()=> {
        it("The period is in the past", ()=>{
            chai.assert.equal(EmptyCheck1("The GrandMaster League test name", "2021-01-18T00:00:00.000+00:00"), false);
        });

        it("The period is in the future", ()=>{
            chai.assert.equal(EmptyCheck1("The GrandMaster League test name", "2021-10-19T00:00:00.000+00:00"), true);
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
                    // done();
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
                    res.body.should.be.a("object");
                    res.body.should.have.property("cName").eql("The GrandMaster League test 2");
                    res.body.should.have.property("cPeriod").eql("2021-11-30T00:00:00.000+00:00");
                    res.body.should.have.property("cStatus").eql(true);

                });
        });

    });

    describe("Admin creates the contest over 5 contests at the same time", ()=> {
        it("The contests create over 5 times", ()=>{
            EmptyCheck1("The GrandMaster League test name 1", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck1("The GrandMaster League test name 2", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck1("The GrandMaster League test name 3", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck1("The GrandMaster League test name 4", "2021-10-19T00:00:00.000+00:00");
            EmptyCheck1("The GrandMaster League test name 5", "2021-10-19T00:00:00.000+00:00");

            chai.assert.equal(EmptyCheck1("The GrandMaster League test name 6", "2021-10-19T00:00:00.000+00:00"), false);
        });
    });

});




// user story 3: Select the Team Players
// Jaspreet Kaur & Hima Bindu Kannam

//var addTableLen = require('../tablesFunction').addTableLen;


/*--------------test cases for the user story 3: selecting the team players--------------------*/
describe("user story 3: Selecting the team players ",function ()
{
    describe("Selection of players must be equal to 10 players",()=> {
        it('must choose only 10 players', function () {
            assert.equal(addPlayers(), 10);
        });

        it('must not exceed more than 10 players', function () {
            assert.notEqual(addPlayers(), 11);
        });
    });

});











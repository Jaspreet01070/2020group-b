const chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
let server = require("../src/app");
var jsdom = require('mocha-jsdom');
var should = require('chai').should;
const {EmptyCheck, onlyAlphabets, uniqueEmail, emailFormat, selectCountry, contactLength, contactContains, usernameContains, uniqueUsername, 
    usernameLength, passwordLength, passContainsAphabets, similarPassword, loginemail, loginpassword} = require("../src/app");
global.document = jsdom({ url:"http://localhost:3001"});

//EmptyCheckResult = app.EmptyCheck();

// Assertion style
chai.should();

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
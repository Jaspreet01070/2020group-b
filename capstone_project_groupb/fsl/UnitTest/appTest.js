//var addTableLen = require('../tablesFunction').addTableLen;
var addPlayers = require('../tablesFunction').addPlayers;
const assert = require("chai").assert;

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
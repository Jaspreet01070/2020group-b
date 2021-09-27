
/*------------------ importing the required files -----------------------*/
const express = require("express");
const bodyParser = require("body-parser");
const {PlatformId,RiotAPI} = require('@fightmegg/riot-api');
const app = express();

/*
const {fileURLToPath} = require('url');
const path = require( "path");
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
*/

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static("public")); // to make public folder as static
app.use('/style',express.static(__dirname+'style')); // to make style folder as static

/*----------------get route for fetching the data form the API------------------------------*/
app.get("/",(req,res)=>{
    (async () =>{
        const rAPI = new RiotAPI('RGAPI-29e1a354-d206-4c4a-a064-334a8af59bf6');
        const summoner = await  rAPI.league.getGrandmasterByQueue({
            region: PlatformId.EUW1,
            queue: "RANKED_SOLO_5x5"
        });
/*--- for fetching object array from the actual object --- that is playersNames and there winning points---*/
        var players = [];
        var wins = [];
        summoner.entries.forEach((obj,i) =>
        {
            players[i] = summoner.entries[i].summonerName ;
            wins[i] = summoner.entries[i].wins;
        });
//sending the retrieved data back into table file
        res.render('table',{data: {players:players,wins:wins }} );

    })().catch(e => {console.error(e)});

});

app.listen(3000 || process.env.PORT);
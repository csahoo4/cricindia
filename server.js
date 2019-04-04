var express = require('express');
var decode = require('unescape');
var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');
var fastXmlParser = require('fast-xml-parser');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var names = {
    msdhoni: 28081,
    vkohli: 253802,
    rsharma: 34102,
    sdhawan: 28235,
    klrahul: 422108,
    mvijay: 237095,
    cpujara: 32540,
    arahane: 277916,
    dkarthik: 30045,
    rashwin: 26421,
    rjadeja: 234675,
    kyadav: 559235,
    hpandya: 625371,
    wsaha: 279810,
    isharma: 236779,
    uyadav: 376116,
    jbumrah: 625383,
    bkumar:326016 ,
    sthakur: 475281,
    knair: 398439,
    mshami: 481896,
    rpant: 931581,
    ychahal: 430246,
    mpandey: 290630,
    apatel: 554691,
    msiraj: 940973,
    msharma: 537119,
    skaul: 326017,
    sraina: 33335,
    wsundar: 719715,
    amishra:31107,
    vshankar: 477021,
    junadkat: 390484,
    siyer: 642519,
    dchahar: 447261,
    ggambhir: 28763,
    arayudu: 33141,
    ysingh: 36084,
    hsingh: 29264,
    ypathan: 32498,
    ipathan: 32685,
    ruthappa: 35582,
    pojha: 32130,
    vkumar: 35731
}
var arr;
app.post('/basicBio', function (req, res) {
    var item;

    var player = req.body.task;
    if (names.hasOwnProperty(player)) {
        item = names[player];
    }
    
    var url = 'http://www.espncricinfo.com/ci/content/player/' + item + '.html';

    request(url, function (error, response, html) {
        if (!error) {
            // use cheerio library on the returned html -- essentially gives us
            // jQuery functionality
            var $ = cheerio.load(html);

            var name;

            var json = { name: "" };

            // get player's name
            $('.SubnavSubsection').filter(function () {
                var data = $(this);
                name = data.text();
                json.name = name;
            });

            var info = $('.ciPlayerinformationtxt');

            var numBasicInfo = $(info).get().length;

            for (var index = 0; index < numBasicInfo; index++) {
                var label = $(info).get(index).children[0].children[0].data.trim();
                if (label === 'Full name') {
                    json.fullName = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Born') {
                    json.dob = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Current age') {
                    json.age = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Major teams') {
                    var teamsChildren = $(info).get(index).children;
                    var teams = "";
                    for (var i = 0; i <= teamsChildren.length; i++) {
                        if (i % 2 === 1 && i !== teamsChildren.length) {
                            teams = teams + teamsChildren[i].next.children[0].data.trim() + " ";
                        }
                    }
                    json.teams = teams.trim();
                } else if (label === 'Nickname') {
                    var nicknamesChildren = $(info).get(index).children;
                    var nicknames = "";
                    for (var i = 0; i <= nicknamesChildren.length; i++) {
                        if (i % 2 === 1 && i !== nicknamesChildren.length) {
                            nicknames = nicknames + nicknamesChildren[i].next.children[0].data.trim() + " ";
                        }
                    }
                    json.nicknames = nicknames.trim();
                } else if (label === 'Playing role') {
                    json.role = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Batting style') {
                    json.batting = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Bowling style') {
                    json.bowling = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Height') {
                    json.playerHeight = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Education') {
                    json.education = $(info).get(index).children[1].next.children[0].data.trim();
                } else {
                    continue;
                }
            }
        }
        // // send JSON response
        arr = [json.fullName, json.dob, json.age, json.teams, json.role, json.batting, json.bowling];
        // console.log(arr)
        res.send(arr);
    })

});

app.post('/battingStats', function (req, res) {
    var player = req.body.task;
    if (names.hasOwnProperty(player)) {
        var item = names[player];
        var url = 'http://www.espncricinfo.com/ci/content/player/' + item + '.html';
        var json = {name: ""};
        var numFormats, b;
        tabletojson.convertUrl(
            url,
            function (tablesAsJson) {
                b = tablesAsJson[0].length;
                numFormats = tablesAsJson[0]
                for (var i = 0; i < b; i++) {
                    var batting = numFormats[i];
                    var format = batting['0'];
                    delete batting['0'];
                    if (format === "Tests") {
                        json.tests = batting;
                    } else if (format === "ODIs") {
                        json.ODIs = batting;
                    } else if (format === "T20Is") {
                        json.T20Is = batting;
                    } else if (format === "First-class") {
                        json.firstClass = batting;
                    } else if (format === "List A") {
                        json.listA = batting;
                    } else if (format === "T20s") {
                        json.twenty20 = batting;
                    } else {
                        break;
                    }
                }
                res.send(json);
            }
        )// send JSON response
    }
});


app.post('/bowlingStats', function (req, res) {
    var player = req.body.task;
    if (names.hasOwnProperty(player)) {
        var item = names[player];
        var url = 'http://www.espncricinfo.com/ci/content/player/' + item + '.html';
        var json = {name: ""};
        var numFormats, b;
        tabletojson.convertUrl(
            url,
            function (tablesAsJson) {
                b = tablesAsJson[1].length
                numFormats = tablesAsJson[1]
                for (var i = 0; i < b; i++) {
                    var bowling = numFormats[i];
                    var format = bowling['0'];
                    delete bowling['0'];
                    if (format === "Tests") {
                        json.tests = bowling;
                    } else if (format === "ODIs") {
                        json.ODIs = bowling;
                    } else if (format === "T20Is") {
                        json.T20Is = bowling;
                    } else if (format === "First-class") {
                        json.firstClass = bowling;
                    } else if (format === "List A") {
                        json.listA = bowling;
                    } else if (format === "T20s") {
                        json.twenty20 = bowling;
                    } else {
                        break;
                    }
                }
                // send JSON response
                res.send(json);
            });
    }
});

app.get('/liveScores', function (req, res) {
    var url = 'http://static.cricinfo.com/rss/livescores.xml';
    request(url, function (error, response, html) {
        var jsonObj = fastXmlParser.parse(response.body);
        var arr = jsonObj.rss.channel.item;
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i].title);
            arr[i] = decode(arr[i].title);
        }
        res.send(arr);
    });
});

app.use("/", express.static(__dirname + "/public_static"));
app.listen('8001')

console.log('Listening on port 8001');

exports = module.exports = app;
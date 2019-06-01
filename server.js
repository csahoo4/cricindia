var express = require('express');
var decode = require('unescape');
var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');
var fastXmlParser = require('fast-xml-parser');
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
var port = process.env.PORT || 8081;
var names = {
    MS_Dhoni: 28081,
    Virat_Kohli: 253802,
    Rohit_Sharma: 34102,
    Shikhar_Dhawan: 28235,
    KL_Rahul: 422108,
    Murli_Vijay: 237095,
    Cheteshwar_Pujara: 32540,
    Ajinkya_Rahane: 277916,
    Dinesh_Karthik: 30045,
    Ravichandran_Ashwin: 26421,
    Ravindra_Jadeja: 234675,
    Kedar_Jadhav:290716,
    Kuldeep_Yadav: 559235,
    Hardik_Pandya: 625371,
    Wriddhiman_Saha: 279810,
    Ishant_Sharma: 236779,
    Umesh_Yadav: 376116,
    Jasprit_Bumrah: 625383,
    Bhuvneshwar_Kumar: 326016,
    Shardul_Thakur: 475281,
    Karun_Nair: 398439,
    Mohammed_Shami: 481896,
    Rishabh_Pant: 931581,
    Yuzvendra_Chahal: 430246,
    Manish_Pandey: 290630,
    Axar_Patel: 554691,
    Mohammed_Siraj: 940973,
    Mohit_Sharma: 537119,
    Siddarth_Kaul: 326017,
    Suresh_Raina: 33335,
    Washington_Sundar: 719715,
    Amit_Mishra: 31107,
    Vijay_Shankar: 477021,
    Jaydev_Unadkat: 390484,
    Shreyas_Iyer: 642519,
    Deepak_Chahar: 447261,
    Ambati_Rayudu: 33141,
    Yuvraj_Singh: 36084,
    Harbhajan_Singh: 29264,
    Yusuf_Pathan: 32498,
    Irfan_Pathan: 32685,
    Robin_Uthappa: 35582,
    Pragyan_Ojha: 32130,
    Vinay_Kumar: 35731
}
var arr;
app.post('/basicBio', function (req, res) {

    var player = req.body.task;
    if (names.hasOwnProperty(player)) {
        var item = names[player];
    }

    var url = 'http://www.espncricinfo.com/ci/content/player/' + item + '.html';

    request(url, function (error, response, html) {
        if (!error) {
            // use cheerio library on the returned html -- essentially gives us
            // jQuery functionality
            var $ = cheerio.load(html);

            var name;

            var json = {name: ""};

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
        arr = [json.fullName, json.dob, json.age, json.teams, json.role, json.batting, json.bowling, $('.ciPlayerprofiletext1').text()];
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
    url = 'http://cricscore-api.appspot.com/csa';
    request(url, function (error, response, html) {
        // console.log(typeof html);
        if (html.charAt(0) !== "\n") {
            arr = JSON.parse(html);
            url = "http://cricscore-api.appspot.com/csa?id=" + arr[0].id;
            for (var i = 1; i < arr.length; i++) {
                url += "+" + arr[i].id;
            }
            request(url, (error, response, html) => {
                if (html.charAt(0) !== "\n") {
                    arr = JSON.parse(html);
                    res.send(arr);
                } else {
                    res.send([{
                        de: "Hey! Whats up ;). I hope you're enjoying :).",
                        si: "Sorry for the inconvenience. Can't load the score at this moment. Please try again later."
                    }]);
                }
            });
        } else {
            res.send([{
                de: "Hey! Whats up ;). I hope you're enjoying :).",
                si: "Sorry for the inconvenience. Can't load the score at this moment. Please try again later."
            }]);
        }
    });
});

app.get('/news', (req, res) => {
    request("http://www.espncricinfo.com/rss/content/story/feeds/0.xml", (error, response, html) => {
        var jsonObj = fastXmlParser.parse(html);
        var arr = jsonObj.rss.channel.item;
        var arr2 = [];
        for (var i = 0; i < arr.length; i++) {
            arr2.push({
                title: decode(arr[i].title),
                desp: decode(arr[i].description),
                cI: decode(arr[i].coverImages),
                pD: decode(arr[i].pubDate)
            });
        }
        res.send(arr2);
    });
});

app.post('/playernews', (req, res) => {
    var player = req.body.task;
    if (names.hasOwnProperty(player)) {
        var item = names[player];
    }

    var url = 'http://www.espncricinfo.com/rss/content/story/feeds/' + item + '.rss';
    request(url, (error, response, html) => {
        var jsonObj = fastXmlParser.parse(html);
        var arr = jsonObj.rss.channel.item;
        var arr2 = [];
        for (var i = 0; i < arr.length; i++) {
            arr2.push({
                title: decode(arr[i].title),
                desp: decode(arr[i].description),
                cI: decode(arr[i].coverImages),
                pD: decode(arr[i].pubDate)
            });
        }
        res.send(arr2);
    });
});

app.use("/", express.static(__dirname + "/public_static"));
app.listen(port);

console.log('Listening on port '+ port);

exports = module.exports = app;
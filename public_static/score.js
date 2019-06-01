$(function () {
    var nav = $('#nav');
    nav.append(`<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <span class="navbar-brand" href="#"><img src="img.png" width="30" height="30" class="d-inline-block align-top"
                                             alt="Couldn't load"></span>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <a class="nav-link" href="#j"><b>Updates</b></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#ch"><b>Player Search</b></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#score"><b>Live Score</b></a>
            </li>
        </ul>
    </div>`);
    (() => {
        $.get('/news', (data) => {
            var i = 0;
            data.forEach((item) => {
                if (i == 0) {
                    news.append(`<div class="carousel-item active">
                                 <div class="text-center bg-danger">
                                  <img class="img-fluid" src=${item.cI} alt="Couldn't Load">
                                  <figcaption><b>${item.title}</b></figcaption>
                                 <figcaption><i>${item.desp}</i></figcaption>
                                 <figcaption>${item.pD}</figcaption>
                                  </div>
                                 </div>`);
                    i = 1;
                } else {
                    news.append(` <div class="carousel-item">
                                  <div class="text-center bg-danger">
                                  <img class="img-fluid" src=${item.cI} alt="Couldn't Load">
                                  <figcaption><b>${item.title}</b></figcaption>
                                  <figcaption><i>${item.desp}</i></figcaption>
                                  <figcaption>${item.pD}</figcaption>
                                  </div>
                                  </div>`);
                }
            });
        });
    })();
    var pn = $('#pn');
    var btn5 = $('#btn5');
    var ne = $('#ne');
    var e = $('#e');
    var roll = $('#roll');
    var score = $('#score');
    var news = $('#news');
    var a = $('#a');
    var b = $('#b');
    var c = $('#c');
    var img = $('#img');
    var img1 = $('#img1');
    var img2 = $('#img2');
    var btn = $('#btn');
    var task = $("#myInput");
    var tb = $('#tb');
    var t = $('#t');
    var btn2 = $('#btn2');
    var btn4 = $('#btn4');
    var t1 = $('#t1');
    var btn3 = $('#btn3');
    var arr = ['Test Record', 'ODI Record', 'T20I Record', 'First-Class Record', 'List-A Record', 'T20 Record'];
    var i = 0;

    function refreshList(data) {
        score.empty();
        data.forEach((item) => {
            i++;
            score.append(`<div class="card">
                          <h5 class="card-header l">Match ${i}</h5>
                          <div class="card-body">
                          <h5 class="card-title">Live score - ${item.de}</h5>
                          <p class="card-text">Score summary - ${item.si}</p>
                          </div>
                          </div>`);
        })
        i = 0;
    }

    function bat(data) {
        tb.append(`<br>
                   <table class="table table-hover table-dark table-sm" border="8px">
                   <tr>
                   <td>Full Name</td>
                   <td>${data[0]}</td>
                   </tr>
                   <tr>
                   <td>Date of Birth</td>
                   <td>${data[1]}</td>
                   </tr>
                   <tr>
                   <td>Age</td>
                   <td>${data[2]}</td>
                   </tr>
                   <tr>
                   <td>Teams</td>
                   <td>${data[3]}</td>
                   </tr>
                   <tr>
                   <td>Role</td>
                   <td>${data[4]}</td>
                   </tr>
                   <tr>
                   <td>Batting</td>
                   <td>${data[5]}</td>
                   </tr>
                   <tr>
                   <td>Bowling</td>
                   <td>${data[6]}</td>
                   </tr>
                   </table>
                   <p class="font-weight-light">
                   ${data[7]} 
                   </p>`)
    }

    function bowl(data) {
        var jb = ['tests', 'ODIs', 'T20Is', 'firstClass', 'listA', 'twenty20'];
        for (i = 0; i < arr.length; i++) {
            if (data.hasOwnProperty(jb[i])) {
                var item = data[jb[i]];
                t.append(`<br><h3>${arr[i]}</h3>
                     <br>
                   <div class="table-responsive">
                   <table class="table table-hover table-dark table-borderless table-striped table-sm" border="8px">
                   <thead>
                   <tr>
                   <th>Matches </th>
                   <th>Runs</th>
                   <th>SR</th>
                   <th>Wickets</th>
                   <th>Innings</th>
                   <th>Economy</th>
                   <th>BBI</th>
                   <th>BBM</th>
                   <th>Average</th>
                   <th>Balls</th>
                   <th>4ws</th>
                   <th>5ws</th>
                   <th>10ws</th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr>
                   <td>${item.Mat}</td>
                   <td>${item.Runs}</td>
                   <td>${item.SR}</td>
                   <td>${item.Wkts}</td>
                   <td>${item.Inns}</td>
                   <td>${item.Econ}</td>
                   <td>${item.BBI}</td>
                   <td>${item.BBM}</td>
                   <td>${item.Ave}</td>
                   <td>${item.Balls}</td>
                   <td>${item['4w']}</td>
                   <td>${item['5w']}</td>
                   <td>${item[10]}</td>
                   </tr>
                   </tbody>
                   </table>
                   </div>`)
            }
        }
    }

    function abc(data) {
        var jb = ['tests', 'ODIs', 'T20Is', 'firstClass', 'listA', "twenty20"];
        for (i = 0; i < jb.length; i++) {
            if (data.hasOwnProperty(jb[i])) {
                var item = data[jb[i]];
                t1.append(`<br><h3>${arr[i]}</h3> 
                            <br>
                            <div class="table-responsive">
                   <table class="table table-hover table-dark table-striped table-borderless table-sm" border="8px">
                   <thead>
                   <tr>
                   <th>Matches </th>
                   <th>Runs</th>
                   <th>SR</th>
                   <th>Balls Faced</th>
                   <th>Innings</th>
                   <th>HS</th>
                   <th>4s</th>
                   <th>6s</th>
                   <th>50</th>
                   <th>100</th>
                   <th>Average</th>
                   <th>Not Outs</th>
                   <th>Catches</th>
                   <th>Stumpings</th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr>
                   <td>${item.Mat}</td>
                   <td>${item.Runs}</td>
                   <td>${item.SR}</td>
                   <td>${item.BF}</td>
                   <td>${item.Inns}</td>
                   <td>${item.HS}</td>
                   <td>${item["4s"]}</td>
                   <td>${item['6s']}</td>
                   <td>${item[50]}</td>
                   <td>${item[100]}</td>
                   <td>${item.Ave}</td>
                   <td>${item.NO}</td>
                   <td>${item.Ct}</td>
                   <td>${item.St}</td>
                   </tr>
                   </tbody>
                   </table>
                   </div>`)
            }
        }
    }

    btn4.click(function () {
        ne.empty();
        t1.empty();
        t.empty();
        tb.empty();
        pn.empty();
        task.val('');
    });

    btn3.click(() => {
        t1.empty();
        img1.show();
        $.ajax({
            type: 'POST',
            url: '/battingStats',
            data: {task: task.val()},
            success: () => {
                img1.hide();
            }
        }).done(function (data) {
            abc(data);
        })
            .fail(function () {
                alert("Batting Stats can't be retrieved. Reload the page.");
            });
    });

    btn2.click(() => {
        t.empty();
        img2.show();
        $.ajax({
            type: 'POST',
            url: '/bowlingStats',
            data: {task: task.val()},
            success: () => {
                img2.hide();
            }
        }).done(function (data) {
            bowl(data);
        })
            .fail(function () {
                alert("Bowling Stats can't be retrieved. Reload the page.");
            });
    });

    function lscores() {
        $.get("/liveScores", (data) => {
            refreshList(data);
        });
    }

    setInterval(function () {
        lscores();
    }, 5000);

    btn.click(() => {
        tb.empty();
        img.show();
        $.ajax({
            type: 'POST',
            url: '/basicBio',
            data: {task: task.val()},
            success: () => {
                img.hide();
            }
        }).done(function (data) {
            bat(data);
        })
            .fail(function () {
                alert("Basic Bio can't be retrieved. Reload the page.");
            });
    });

    function pnews(data) {
        pn.append(` <a class="carousel-control-prev" href="#c" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#c" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>`);
        var i = 0;
        data.forEach((item) => {
            if (i == 0) {
                ne.append(`<div class="carousel-item active">
                                 <div class="text-center bg-warning">
                                  <img class="img-fluid" src=${item.cI} alt="Couldn't Load">
                                  <figcaption><b>${item.title}</b></figcaption>
                                 <figcaption><i>${item.desp}</i></figcaption>
                                 <figcaption>${item.pD}</figcaption>
                                  </div>
                                 </div>`);
                i = 1;
            } else {
                ne.append(` <div class="carousel-item">
                                  <div class="text-center bg-warning">
                                  <img class="img-fluid" src=${item.cI} alt="Couldn't Load">
                                  <figcaption><b>${item.title}</b></figcaption>
                                  <figcaption><i>${item.desp}</i></figcaption>
                                  <figcaption>${item.pD}</figcaption>
                                  </div>
                                  </div>`);
            }
        });
    }

    btn5.click(() => {
        ne.empty();
        roll.show();
        $.ajax({
            type: 'POST',
            url: '/playernews',
            data: {task: task.val()},
            success: () => {
                roll.hide();
            }
        }).done(function (data) {
            pnews(data);
        })
            .fail(function () {
                alert("News about player can't be retrieved. Reload the page.");
            });
    });
})

$(function () {
    var list = $('#list');
    var btn1 = $("#btn1");
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
    var ch1 = 1, ch2 = 1, ch3 = 1;
    var arr = ['Test Record', 'ODI Record', 'T20I Record', 'First-Class Record', 'List-A Record', 'T20 Record'];

    function refreshList(data) {
        // $("#list").clear();
        list.empty();
        data.forEach((item) => {
            list.append(`<li id="l" class="list-group-item">${item}</li>`);
        })
        list.append(`<br><span class="text-center"><button type="button" class="btn btn-warning" id="btn1">Refresh Live Score</button></span>`)
    }

    function bat(data) {
        tb.empty();
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
                   </table>`)
    }

    function bowl(data) {
        t.empty();
        var jb = ['tests', 'ODIs', 'T20Is', 'firstClass', 'listA', 'twenty20'];
        for (i = 0; i < arr.length; i++) {
            if (data.hasOwnProperty(jb[i])) {
                var item = data[jb[i]];
                // console.log( item );
                t.append(`<br><h3>${arr[i]}</h3> <br><table class="table table-hover table-borderless table-striped table-sm" border="8px">
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
                   </table>`)
            }
        }
    }

    function abc(data) {
        t1.empty();
        // console.log(data);
        var jb = ['tests', 'ODIs', 'T20Is', 'firstClass', 'listA', "twenty20"];
        for (i = 0; i < jb.length; i++) {
            if (data.hasOwnProperty(jb[i])) {
                var item = data[jb[i]];
                // console.log( item );
                t1.append(`<br><h3>${arr[i]}</h3> <br><table class="table table-hover table-borderless table-striped table-sm" border="8px">
                   <thead>
                   <tr>
                   <td>Matches </td>
                   <td>Runs</td>
                   <td>SR</td>
                   <td>Balls Faced</td>
                   <td>Innings</td>
                   <td>HS</td>
                   <td>4s</td>
                   <td>6s</td>
                   <td>50</td>
                   <td>100</td>
                   <td>Average</td>
                   <td>Not Outs</td>
                   <td>Catches</td>
                   <td>Stumpings</td>
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
                   </table>`)
            }
        }
    }

    btn4.click(function () {
        t1.empty();
        t.empty();
        tb.empty();
        task.val('');
    })
    btn3.click(() => {
        if (ch1 == 1) {
            b.append(`<br>`);
            ch1++;
        }
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
                alert("error");
            });
    })
    btn2.click(() => {
        if (ch2 == 1) {
            c.append(`<br>`);
            ch2++;
        }
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
                alert("error");
            });
    })

    function lscores() {
        $.get("/liveScores", (data) => {
            // console.log(data);
            refreshList(data);
        });
    }

    btn1.click(function () {
        lscores();
    })
    setTimeout(function () {
        lscores();
    }, 2000);
    btn.click(() => {
        if (ch3 == 1) {
            a.append(`<br>`);
            ch3++;
        }
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
                alert("error");
            });
    })
})

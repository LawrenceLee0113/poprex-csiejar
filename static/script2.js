// !animation and upload js
var clicks = 0;
var default_clicks = 0;
var renew = false;
function nFormatter(num) {
    num = parseInt(num);
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}
function click_reset(mode = "default") {
    if (mode == "default") {
        score.innerText = default_clicks + clicks

    } else if (mode == "reset") {

        clicks = 0;
        default_clicks = 0;
        score.innerText = default_clicks + clicks
    }
}
function start_renew() {
    reload(1);
    renew = true;
}
function stop_renew() {
    renew = false;
}
var play_music = true;
function down() {
    x = 1
    $("#face2").show();
    $("#face1").hide();
    if(play_music){

        var sound = document.getElementById("audio");
        sound.load();
        sound.play();
        play_music = false;
    }
    // alert("aa")
}
function up() {
    // alert("aaa")
    x = 0
    clicks += 1
    play_music = true;
    score.innerText = default_clicks + clicks
    $("#face1").show();
    $("#face2").hide();
    // var sound = document.getElementById("audio");
    // sound.pause()
}
function ranking_sort(data) {
    // console.log("rankin sort")
    let sortable = [];
    for (var i in data) {
        sortable.push([i, data[i]["clicks"]]);
    }
    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    sortable.reverse();
    var output = [];
    var last_click = 0;
    counter = 1
    for (var i in sortable) {

        if (sortable[i][1] == last_click) {
            data[sortable[i][0]]["ranking"] = counter - 1;
        } else {
            data[sortable[i][0]]["ranking"] = counter;

            counter++;
        }
        last_click = sortable[i][1];
        output.push(data[sortable[i][0]])
    }
    return output;
}
var add_data = {

}
function upload_data(clicks) {

    $.post("/upload", { "account": account, "passcode": passcode, "clicks": clicks },
        function (data, textStatus, jqXHR) {
            if (data.message == "fail") {
                if (account != "") {
                    stop_renew();
                    signOut();
                    alert("已偵測到第二個裝置 已登出")
                    location.reload();
                }
            } else if (data.message == "success") {
                $(".data_content_warp").empty();
                var accounts = ranking_sort(data.accounts)
                // console.log(accounts)
                let last_click;
                for (i of accounts) {
                    let output_item = $(demo_item).clone();
                    $(output_item).prop("id", "ranking_" + i.ranking)
                    $(output_item).children(".lab_ranking").html(i.ranking)
                    $(output_item).children(".lab_class").html(i.class)
                    $(output_item).children(".lab_name").html(i.name)
                    $(output_item).children(".lab_id").html(i.ig)
                    var num;
                    try {

                        if (add_data[i.id] != i.clicks && add_data[i.id] != undefined) {
                            num = parseInt(i.clicks) - parseInt(add_data[i.id]) + "/s  "
                            $(output_item).children("span").css({ "color": "blue" })

                        } else {
                            num = ""
                        }
                    } catch (error) {
                        console.error(error);
                        // expected output: ReferenceError: nonExistentFunction is not defined
                        // Note - error messages will vary depending on browser
                    }

                    $(output_item).children(".lab_click").html(num + nFormatter(i.clicks))
                    add_data[i.id] = i.clicks
                    if (i.id == account) {
                        $(output_item).children("span").css({ "color": "red", "font-weight": "bolder" })
                        $("#self_ranking").html("#" + i.ranking)
                        $("#last_ranking").html("#" + (parseInt(i.ranking) - 1))
<<<<<<< HEAD
                        $("#last_ranking_minus").html("(-" + last_click - i.clicks + ")")
=======
                        let last_ranking_minus = parseInt(last_click)-parseInt(i.clicks)
                        $("#last_ranking_minus").html("(-" + last_ranking_minus + ")")
>>>>>>> 8dc062dca16676e895128d5aff767e6478e8ee82
                        $("#ranking_info").show();
                        $("#self_area a").prop("href", "#ranking_" + i.ranking)
                        $("#last_area a").prop("href", "#ranking_" + (parseInt(i.ranking) - 1))
                    }
                    last_click = i.clicks
                    $(output_item).show()
                    $(".data_content_warp").append(output_item);

                    // console.log($(output_item).html())
                    // counter++;
                }
                $(".sb_amount").html(data);
            }
        },
        "json"
    );
}
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
var last_click = 0;
function reload(time) {

    for (let i = 1; i <= time; i++) {
        window.setTimeout(function () {
            if (renew) {
                console.log(i)
                upload_data(clicks - last_click)
                last_click = clicks;
                if (i == time) {
                    reload(time)
                }
            }
        }, 1000 * i);
    }
}
var x = 0
var demo_item;
function score_board_up() {
    $(".content").css("top", "auto").css("bottom", "0px");

    $("#down_img").show();
    $("#up_img").hide();
    login_page = true;
}
function score_board_down() {
    $(".content").css("top", "calc(100vh - 46px)").css("bottom", "auto");
    $("#up_img").show();
    $("#down_img").hide();
    login_page = false;
}
var login_page = false;
var bot = true;
$(document).ready(function () {
    //score board open and close
    $(".data_title").click(function (e) {
        $(".login-space").hide();
        if (login_page) {
            score_board_down()
        } else {
            score_board_up();
        }

    });
    //cancel a direction
    $(".eportal_login_btn a").click(function (e) {
        e.preventDefault();

    });
    $(".content a").click(function (e) {
        e.preventDefault();

    });
    $(".account_icon").click(function (e) {
        e.preventDefault();
        $(".login-space").show();
        $("#save_input").html("未更改！");
        score_board_down();
        $.get("/self_info", { "account": account },
            function (data, textStatus, jqXHR) {
                if (data.message == "true") {
                    $("#class_input").val(data.self_info["class"]);
                    $("#name_input").val(data.self_info["name"]);
                    $("#ig_input").val(data.self_info["ig"]);
                    $("#introduce_input").val(data.self_info["introduce"]);
                } else if (data.message == "false") {
                    console.log(data)
                    alert("取得資料錯誤!!")
                }
            },
            "json"
        );

    });
    $(".login_btn").click(function (e) {
        e.preventDefault();
        $(".login-space").show();
        score_board_down();
    });
    $(".cancel_login_ntn").click(function (e) {
        e.preventDefault();
        $(".login-space").hide();
    });

    demo_item = $(".data_item").clone();

    let body = $("body")
    if (detectMob()) {

        $(body).bind("touchstart", down)
        $(body).bind("touchend", up)
    } else {
        $("body").mouseenter(function () { 
            // alert('enter')
            bot = true;
        });
        $("body").mouseleave(function () { 
            // alert("over")
            bot = false
        });
        if(bot){
          $(body).keydown(down);
          $(body).mousedown(down);
  
          $(body).keyup(up);
          $(body).mouseup(up);
          
        }
    }

    start_renew();
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') {
            normal_title = document.title; 
            document.title = '💖記得回來按我喔💖';
            stop_renew();
        } else{
            document.title = normal_title;
            start_renew();
            
        }
    });

});
// !animation and upload js
var clicks = 0;
var renew = false;
function start_renew(){
    reload(1);
    renew = true;
}
function stop_renew(){
    renew = false;
}
function down() {
    x = 1
    $("#face2").show();
    $("#face1").hide();
}
function up() {
    // alert("aaa")
    x = 0
    clicks += 1
    score.innerText = clicks
    $("#face1").show();
    $("#face2").hide();
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
                for (i of accounts) {
                    
                    let output_item = $(demo_item).clone();
                    $(output_item).children(".lab_ranking").html(i.ranking)
                    $(output_item).children(".lab_class").html(i.class)
                    $(output_item).children(".lab_name").html(i.name)
                    $(output_item).children(".lab_id").html(i.ig)
                    $(output_item).children(".lab_click").html(i.clicks)
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
            if(renew){
                console.log(i)
                upload_data(clicks - last_click)
                last_click = clicks;
                if(i == time){
                    reload(time)
                }
            }
        }, 1000 * i);
    }
}
var x = 0
var demo_item;
$(document).ready(function () {
    //score board open and close
    var login_page = false;
    $(".data_title").click(function (e) {
        if (login_page) {

            $(".content").css("top", "calc(100vh - 46px)").css("bottom", "auto");
            $("#up_img").show();
            $("#down_img").hide();
            login_page = false;
        } else {
            $(".content").css("top", "auto").css("bottom", "0px");

            $("#down_img").show();
            $("#up_img").hide();
            login_page = true;
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
        $.get("/self_info", {"account":account},
            function (data, textStatus, jqXHR) {
                if(data.message == "true"){
                    $("#class_input").val(data.self_info["class"]);
                    $("#name_input").val(data.self_info["name"]);
                    $("#ig_input").val(data.self_info["ig"]);
                    $("#introduce_input").val(data.self_info["introduce"]);
                }else if(data.message == "false"){
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
    });
    $(".cancel_login_ntn").click(function (e) { 
        e.preventDefault();
        $(".login-space").hide();
    });

    demo_item = $(".data_item").clone();
    
    let body = $("body")
    if(detectMob()){
        
        $(body).bind("touchstart",down)
        $(body).bind("touchend",up)
    }else{
        $(body).keydown(down);
        $(body).mousedown(down);

        $(body).keyup(up);
        $(body).mouseup(up);
    }

    start_renew();
    
});
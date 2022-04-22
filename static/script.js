var demo_item;

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
var x = 0
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
                    alert("還敢同時登兩個裝置啊87")
                    location.reload();
                }
            } else if (data.message == "success") {
                $(".data_content_warp").empty();
                var accounts = ranking_sort(data.accounts)
                // console.log(accounts)
                for (i of accounts) {
                    // console.log(i)
                    let output_item = $(demo_item).clone();
                    $(output_item).children(".lab_ranking").html(i.ranking)
                    $(output_item).children(".lab_class").html(i.class)
                    $(output_item).children(".lab_name").html(i.name)
                    $(output_item).children(".lab_id").html(i.id)
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

var clicks = 0;
$(document).ready(function () {
    // console.log(detectMob())
    demo_item = $(".data_item").clone();
    var last_click = 0;
    function reload(time) {

        for (let i = 1; i <= time; i++) {
            window.setTimeout(function () {
                // console.log(i);
                upload_data(clicks - last_click)
                last_click = clicks;
                if(i == time){
                    reload(5)
                }
            }, 1000 * i);
        }
    }
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


    reload(5);
});
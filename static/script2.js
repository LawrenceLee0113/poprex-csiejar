$(document).ready(function () {
    //score board open and close
    var login_page = false;
    $(".data_title").click(function (e) {
        if (open) {

            $(".content").css("top", "calc(100vh - 46px)").css("bottom", "auto");
            $("#up_img").show();
            $("#down_img").hide();
            open = false;
        } else {
            $(".content").css("top", "auto").css("bottom", "0px");

            $("#down_img").show();
            $("#up_img").hide();
            open = true;
        }

    });
    //cancel a direction
    $(".eportal_login_btn a").click(function (e) {
        e.preventDefault();

    });
    $(".content a").click(function (e) {
        e.preventDefault();

    });
    $(".eportal_login_btn").click(function (e) { 
        e.preventDefault();
        $(".login-space").show();
        
    });
    $(".cancel_login_ntn").click(function (e) { 
        e.preventDefault();
        $(".login-space").hide();
    });
    
    
});
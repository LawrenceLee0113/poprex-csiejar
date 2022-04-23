// !sign in sign out js
var account = ""
var passcode = ""
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $(".g-signin2").show();
    $(".google_signout").hide();

    $(".eportal_login_btn").show();
    $('.account_icon').hide();
    
    $(".account_icon span").html("");
    $(".account_icon img").attr("src","");

    $(".unlogin").css("display","flex");
    $('.logined').hide();

    click_reset("reset");
    passcode = ""
    account = ""
    
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    let id = profile.getId();
    let name = profile.getName();
    let img = profile.getImageUrl();
    let email = profile.getEmail();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    $("#self_name").html(name);
    $("#self_id").html(id);
    $("#self_gmail").html(email);   
    $(".login-space").hide();
    $.post("/google", {"id":id,"name": name,"img":img,"email":email},
        function (data, textStatus, jqXHR) {
            if(data.message == "true"){
                account = id;
                passcode = data.passcode;
                let click = parseInt(data.click);
                console.log(click)
                $(".g-signin2").hide();
                $(".google_signout").show();

                $(".eportal_login_btn").hide();
                $('.account_icon').show();
                
                $(".account_icon span").html(name);
                $(".account_icon img").attr("src",img);

                $(".unlogin").hide();
                $(".logined").css("display", "flex");
                
              
                // alert("登入成功")
                click_reset("reset");
                default_clicks = click
                click_reset();
            }else if(data.message == "false"){
                alert("登入失敗")
            }
        },
        "json"
    );
}
$(document).ready(function () {
    
});
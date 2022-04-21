var passcode = "";//防止登兩個帳號按
var account = "";
$(document).ready(function () {
    $("#submit").click(function (e) {
        let input_account = $("#account_input").val();//帳號
        const password = $("#password_input").val();//密碼
        if (input_account == "" || password == "") {
            alert("帳號和密碼要填東西啊")
        } else {

            $.post("/eportal", { "account": input_account, "password": password },
                function (data, textStatus, jqXHR) {
                    if (data.message == "true") {
                        console.log(data)
                        passcode = data.passcode;
                        account = input_account;
                        $(".login-space").hide();
                        $(".eportal_login_btn").show();
                        $(".eportal_login_btn span").html("login success");
                    
                        alert("登入成功")
                    } else {
                        alert("帳號或密碼錯誤!")
                    }

                },
                "json"
            );
        }
    });
    
    

});


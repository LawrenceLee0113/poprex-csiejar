$(document).ready(function () {
    $("#empty_input").click(function (e) { 
        e.preventDefault();
        $("#class_input").val("");
        $("#name_input").val("");
        $("#ig_input").val("");
        $("#introduce_input").val("");
    });
    $("#save_input").click(function (e) { 
        e.preventDefault();
        if(change_input){

            change_input = false;
            $("#save_input").html("儲存中...");
            $.post("/self_info", {"account":account,"class":$("#class_input").val(),"ig":$("ig_input").val(),"introduce":$("#introduce_input").val(),"name":$("#name_input").val()},
                function (data, textStatus, jqXHR) {
                    if(data.message == "true") {
    
                        $("#save_input").html("已儲存！");
                    }else if(data.message == "false"){
                        $("#save_input").html("儲存失敗.");
                        setTimeout(function(){
                            $("#save_input").html("儲存資料！");
                            
                        },1000)
    
                    }
                },
                "json"
            );
        }
    });
    var change_input = false;
    $(".login_btns .q_item input").change(function (e) { 
        e.preventDefault();
        change_input = true;
        $("#save_input").html("儲存資料！");
        
    });
});
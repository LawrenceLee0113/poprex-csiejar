$(document).ready(function () {
    $("#default_input").click(function (e) { 
        e.preventDefault();
        
    });
    $("#save_input").click(function (e) { 
        e.preventDefault();
        $.post("/self_info", {"account":account,"class":$("#class_input").val(),"ig":$("ig_input").val(),"introduce":$("#introduce_input").val(),"name":$("#name_input").val()},
            function (data, textStatus, jqXHR) {
                console.log(data)
            },
            "json"
        );
    });
});
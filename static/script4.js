// // more info item control
// var now_info_item_id = ""
// var info_item = $(".person_info_item")
// console.log("empty")
// $(".person_info_space").empty();
// function set_more_info(accounts) {
//     for (let i of accounts) {
//         var now_item = $(info_item).clone(true, true);
//         $(now_item).find(".self_ig_link").html("ig: " + i.ig).prop("href", "https://www.instagram.com/" + i.ig + "/");
//         $(now_item).find(".self_introduce").html(i.introduce)
//         $(now_item).prop("id", i.id + "_info_item")
//         $(".person_info_space").append(now_item);

//     }
// }
// function change_page(id, mode = "now") {
//     var info_items = $(".person_info_space").children(".person_info_item");
//     $.each(info_items, function (i, v) {
//         let now_id = $(v).prop("id");
//         if (now_id == id) {
//             $(v).show();
//             now_info_item_id = id;
//         } else {
//             $(v).hide();
//         }
//     });
// }
// function get_page_id(index = 0, id = now_info_item_id) {
//     var info_items = $(".person_info_space").children(".person_info_item");
//     var id_list = []
//     $.each(info_items, function (i, v) {
//         id_list.push($(v).prop("id"));
//     });
//     var a = id_list.indexOf(id)
//     output = id_list[a + index]
//     if (output == undefined) {
//         output = id_list[a];
//     }
//     return output;
// }
// function dosomething(){
//     alert("aaa")
// }
// $(document).ready(function () {
//     $(".close_page_btn").click(function (e) {
//         $(".person_info").hide();
//     });
//     $(".page_right").click(function (e) {
//         e.preventDefault();
//         change_page(get_page_id(1))
//     });
//     $(".page_left").click(function (e) {
//         e.preventDefault();
//         change_page(get_page_id(-1))
//     });
    
// });
$(document).ready(function () {
    console.log("ready")

    const body = this.document.getElementById("main")
    const score = this.document.getElementById("score")
    const face = this.document.getElementById("face")
    var x = 0

    body.addEventListener("keydown", function () {
        x = 1
        $("#face2").show();
        $("#face1").hide();
    })

    body.addEventListener("keyup", function () {
        x = 0
        let score_num = Number(score.innerText)
        score.innerText = score_num + 1
        
    })

    this.window.addEventListener("mousedown", function () {
        x = 1
        $("#face2").show();
        $("#face1").hide();
    })

    this.window.addEventListener("mouseup", function () {
        x = 0
        let score_num = Number(score.innerText)
        score.innerText = score_num + 1
        face.src = "imgs/rex" + x + ".png"
    })
});
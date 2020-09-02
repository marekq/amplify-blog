window.onload=function(){
    var input = document.getElementById("page");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("box").click();
        }
    });
}
function getNameFunction() {
    let yourName = prompt("Give me your name:");
    if (yourName !== null) {
        paragraph = document.getElementById("userName");
        paragraph.innerHTML = "Your name is: " + yourName;
    }
}
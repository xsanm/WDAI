function incrementCounter() {
    let currentCounter = document.getElementById("counter");
    currentCounter.innerHTML = Number(currentCounter.innerHTML) + 1
}

function disableCounter() {
    let btn1 = document.getElementById("btn1");
    if (btn1.disabled === false) {
        document.getElementById("counter").innerHTML = 0;
        btn1.disabled = true;
        document.getElementById("btn2").innerHTML = "Enable";
    } else {
        btn1.disabled = false;
        document.getElementById("btn2").innerHTML = "Disable";
    }
}
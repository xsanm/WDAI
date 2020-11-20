let score = 0;
let propagation = true;

function printScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

function clickBlock1() {
    //alert("Clicked blue where value = 1");

    score += 1;

    printScore();

}

function clickBlock2(event) {
    //alert("Clicked red where value = 2");

    if (score <= 30) {
        score += 2;
    }
    printScore();
    if (propagation == false) {
        event.stopPropagation();
    }
}

function clickBlock3(event) {
    //alert("Clicked yellow where value = 5");

    if (score <= 50) {
        score += 5;
    }
    printScore();
    if (propagation == false) {
        event.stopPropagation();
    }
}

function onoffPropagation() {
    if (propagation === true) {
        propagation = false;
        document.getElementById("onoff").innerHTML = "Turn On Propagation";
    } else {
        propagation = true;
        document.getElementById("onoff").innerHTML = "Turn Off Propagation";
    }
}

function reset() {
    score = 0;
    printScore();
}
let score = 0;
let propagation = true;

function printScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

function clickBlock1() {
    alert("Clicked blue val 1");
    if (propagation) {
        score += 1;

        printScore();
    }
}

function clickBlock2() {
    alert("Clicked red val 2");
    if (propagation) {
        if (score <= 30) {
            score += 2;
        }

        printScore();
    }
}

function clickBlock3() {
    alert("Clicked yellow val 5");
    if (propagation) {
        if (score <= 50) {
            score += 5;
        }

        printScore();
    }
}

function onoffPropagation() {
    if (propagation === true) {
        propagation = false;
        document.getElementById("onoff").innerHTML = "Turn On Counting";
    } else {
        propagation = true;
        document.getElementById("onoff").innerHTML = "Turn Off Counting";
    }
}

function reset() {
    score = 0;
    propagation = true;
    printScore();
    document.getElementById("onoff").innerHTML = "Turn Off Counting";
}
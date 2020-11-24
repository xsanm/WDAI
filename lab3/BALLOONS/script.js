const gameArea = document.getElementById('gameArea');
let playerName = "";
let startTime = 0;
let stopTime = 0;
let currentBallon = 0;
let balloonCounter = 0;
let shootedBallons = 0;
let shoots = 0;
let missedShoots = 0;
let points = 0;
const audio1 = new Audio('sounds/balloon-pop.mp3');
const audio2 = new Audio('sounds/shoot-bow.mp3');
const rankURL = "https://jsonblob.com/api/jsonBlob/ce0058ef-2e81-11eb-967c-71493dbd26fa";
const rankURL2 = "https://jsonblob.com/ce0058ef-2e81-11eb-967c-71493dbd26fa";



function printResults(data) {
    //console.log(data);
    document.getElementById("highcoresHeader").style.visibility = "visible";
    document.getElementById("playAgainBtn").style.visibility = "visible";
    document.getElementById("highscores").style.visibility = "visible";

    let table = document.getElementById("highscores");
    for (let i = 0; i < data.length; i++) {
        let newtTr = document.createElement("tr");
        let newTd1 = document.createElement("td");
        let newTd2 = document.createElement("td");
        let newTd3 = document.createElement("td");
        newTd1.innerHTML = data[i].id;
        newTd2.innerHTML = data[i].nick;
        newTd3.innerHTML = data[i].score;
        newtTr.appendChild(newTd1);
        newtTr.appendChild(newTd2);
        newtTr.appendChild(newTd3);
        table.appendChild(newtTr);
    }

}

function GetSortOrder(prop) {
    return function(a, b) {
        if (parseInt(a[prop]) > parseInt(b[prop])) {
            return -1;
        } else if (parseInt(a[prop]) < parseInt(b[prop])) {
            return 1;
        }
        return 0;
    }
}

async function actualizeRank() {
    let data = await fetch(rankURL).then(r => r.json());
    //console.log(data['Results']);

    //data['Results'].push({ "nick": playerName, "score": points });

    data['Results'].sort(GetSortOrder("score"));
    if (data['Results'][6].score <= points) {
        data['Results'][6].score = points;
        data['Results'][6].nick = playerName;
        data['Results'].sort(GetSortOrder("score"));
    }

    for (let i = 0; i < data['Results'].length; i++) {
        data['Results'][i].id = i + 1;
    }

    printResults(data['Results']);

    //console.log(typeof data);

    let res = await fetch(rankURL, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });

    console.log(res);
}

function initialize() {
    gameArea.setAttribute("onclick", "missedShoot()");
    gameArea.style.cursor = "crosshair";
    getPlayerName();
    setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 30);
}

function missedShoot() {
    console.log("niecelny strzal");
    missedShoots++;
    shoots++;
    points -= 5;
    actualizeStats();
}

function setBackground() {
    document.getElementById("gameArea").style.background = '#ff5c33';
    setTimeout(() => { document.getElementById("gameArea").style.background = 'white' }, 100);
}


function balloonEvent(event, shooted, id) {
    //console.log(id);
    if (event != null) event.stopPropagation();
    if (document.getElementById(id) == null) return;
    if (shooted) {
        stopTime = performance.now();
        console.log("trafiony " + id);
        console.log(stopTime - startTime);
        document.getElementById(id).remove();
        shootedBallons++;
        shoots++;


        //audio1.play();

        points += (10 - Math.round(10 * (stopTime - startTime - 500) / 2000));
        //setPoints();

        setBackground()
        actualizeStats();
    } else {
        if (document.getElementById(id) != null) {
            document.getElementById(id).remove();
            console.log("czas minal " + id + " nietrafiony");
            //generateBalloons();
        }
    }
    if (balloonCounter < 3) {
        setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 20);
    } else {
        console.log("koniec");
        window.confirm("Koniec! Twoj wynik to: " + points);
        actualizeRank();
    }


}

//asking player about nick 
function getPlayerName() {
    playerName = prompt("Podaj swój nick: ");
    document.getElementById("nickBox").innerHTML = playerName;
}

function actualizeStats() {
    document.getElementById("roundBox").innerHTML = currentBallon;
    document.getElementById("shootsFiredBox").innerHTML = shoots;
    document.getElementById("hitBox").innerHTML = shootedBallons;
    document.getElementById("accuracyBox").innerHTML = (shootedBallons * 100 / shoots).toFixed(2);
    document.getElementById("pointsBox").innerHTML = points;
}


function generateBalloons() {

    ++balloonCounter;
    ++currentBallon;
    actualizeStats();

    let new_div = document.createElement('div');
    new_div.setAttribute("class", "balloon");
    new_div.setAttribute("onclick", 'balloonEvent(event, true, ' + balloonCounter + ', event)');
    new_div.setAttribute("id", balloonCounter);
    new_div.innerHTML = balloonCounter;

    let ballonSize = generateRandomNumber(80, 150);
    new_div.style.width = ballonSize + 'px';
    new_div.style.height = ballonSize + 'px';
    //new_div.style.clip = "circle(100%)";

    new_div.style.top = generateRandomNumber(0, 400 - ballonSize) + 'px';
    new_div.style.left = generateRandomNumber(0, 900 - ballonSize) + 'px'

    new_div.style.backgroundColor = getRandomColor();
    gameArea.appendChild(new_div);

    setTimeout("balloonEvent(null, false," + balloonCounter + ")", 3000);
    startTime = performance.now();
}


function generateRandomNumber(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


initialize()

function playAgain() {
    playerName = "";
    startTime = 0;
    stopTime = 0;
    currentBallon = 0;
    balloonCounter = 0;
    shootedBallons = 0;
    shoots = 0;
    missedShoots = 0;
    points = 0;
    document.getElementById("highcoresHeader").style.visibility = "hidden";
    document.getElementById("playAgainBtn").style.visibility = "hidden";

    let tab = document.getElementById("highscores");
    tab.style.visibility = "hidden";
    while (tab.firstChild) {
        tab.removeChild(tab.lastChild);
    }
    initialize();
}




// highscore json blob: https://jsonblob.com/_WSTAW_SWOJ_HASH_JSON"

// resztę zaimplementuj sam :-)
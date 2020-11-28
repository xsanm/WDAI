/*  
    Ranking ustalony tylko na 7 rekordów, 
    tak było pokazene w przykładzie ale można to łatwo zmienic

    Ponizsza linijka odpowiada za szybosc pojawiania sie balonu, 
    jest na tyle prosta że nie tworzylem funkcji
    setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 20);
*/


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

//comparator do sortowania JSON
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

//zmiana tła po celnym strzale
function setBackground() {
    document.getElementById("gameArea").style.background = '#ff5c33';
    setTimeout(() => { document.getElementById("gameArea").style.background = 'white' }, 100);
}

//generuje pseudolosowa liczbe
function generateRandomNumber(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

//generuje pseudolosowy kolor
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function printResults(data) {
    //console.log(data);
    document.getElementById("highcoresHeader").style.visibility = "visible";
    document.getElementById("playAgainBtn").style.visibility = "visible";
    document.getElementById("highscores").style.visibility = "visible";

    let table = document.getElementById("highscores");

    table.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        let newtTr = document.createElement("tr");
        let newTd1 = document.createElement("td");
        let newTd2 = document.createElement("td");
        let newTd3 = document.createElement("td");
        let newTd4 = document.createElement("td");
        newTd1.innerText = data[i].id;
        newTd2.innerText = data[i].nick;
        newTd3.innerText = data[i].score;
        newTd4.innerText = data[i].date;
        newtTr.appendChild(newTd1);
        newtTr.appendChild(newTd2);
        newtTr.appendChild(newTd3);
        newtTr.appendChild(newTd4);
        table.appendChild(newtTr);
    }

}

//pyta gracza o nick, do skutku
function getPlayerName() {
    playerName = prompt("Podaj swój nick: ");
    if (playerName === "") return getPlayerName();
    document.getElementById("nickBox").innerHTML = playerName;
}

//aktualizuje gorny panel statystyk
function actualizeStats() {
    document.getElementById("roundBox").innerHTML = currentBallon;
    document.getElementById("shootsFiredBox").innerHTML = shoots;
    document.getElementById("hitBox").innerHTML = shootedBallons;
    document.getElementById("accuracyBox").innerHTML = (shootedBallons * 100 / shoots).toFixed(2);
    document.getElementById("pointsBox").innerHTML = points;
}

//obslugiwanie nietrafionego strzału
function missedShoot() {
    if (balloonCounter == 0) return;
    console.log("niecelny strzal");
    audio2.play();
    missedShoots++;
    shoots++;
    points -= 5;
    actualizeStats();
}

async function actualizeRank() {
    let data = await fetch(rankURL).then(r => r.json());
    //console.log(data['Results']);

    if (data['Results'].length < 7) {
        data['Results'].push({ "nick": playerName, "score": points, "date": new Date() });
        data['Results'].sort(GetSortOrder("score"));
    } else {
        data['Results'].sort(GetSortOrder("score"));
        if (data['Results'][6].score <= points) {
            data['Results'][6].score = points;
            data['Results'][6].nick = playerName;
            data['Results'][6].date = new Date();
            data['Results'].sort(GetSortOrder("score"));
        }

        for (let i = 0; i < data['Results'].length; i++) {
            data['Results'][i].id = i + 1;
        }
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

//inicjalizacja gry
function initialize() {
    getPlayerName();
    gameArea.setAttribute("onclick", "missedShoot()");
    gameArea.style.cursor = "crosshair";
    setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 30);
}

//oblicza punkty na podstawie reakcji
function countPoints(a, b) {
    return (10 - Math.round(10 * (b - a - 500) / 2000));
}

//strzał lub koniec czasu
function balloonEvent(event, shooted, id) {
    if (event != null) event.stopPropagation();
    if (document.getElementById(id) == null) return;
    if (shooted) {
        stopTime = performance.now();
        console.log("trafiony " + id);
        console.log(stopTime - startTime);
        document.getElementById(id).remove();
        shootedBallons++;
        shoots++;

        audio1.play();

        points += countPoints(startTime, stopTime);

        setBackground()
        actualizeStats();
    } else {
        if (document.getElementById(id) != null) {
            document.getElementById(id).remove();
            console.log("czas minal " + id + " nietrafiony");
        };
    }
    if (balloonCounter < 30) {
        setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 20);
    } else {
        console.log("koniec");
        window.confirm("Koniec! Twoj wynik to: " + points);
        gameArea.removeAttribute('onclick');
        gameArea.style.cursor = "default";
        actualizeRank();
    }
}

//generuje i wyswietla balon
function generateBalloons() {

    ++balloonCounter;
    ++currentBallon;
    actualizeStats();

    let new_div = document.createElement('div');
    new_div.setAttribute("class", "balloon");
    new_div.setAttribute("onclick", 'balloonEvent(event, true, ' + balloonCounter + ', event)');
    new_div.setAttribute("id", balloonCounter);
    //new_div.innerHTML = balloonCounter;

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



//graj ponownie
function playAgain() {
    playerName = "";
    document.getElementById("highcoresHeader").style.visibility = "hidden";
    document.getElementById("playAgainBtn").style.visibility = "hidden";

    let tab = document.getElementById("highscores");
    tab.style.visibility = "hidden";
    while (tab.firstChild) {
        tab.removeChild(tab.lastChild);
    }
    startTime = 0;
    stopTime = 0;
    currentBallon = 0;
    balloonCounter = 0;
    shootedBallons = 0;
    shoots = 0;
    missedShoots = 0;
    points = 0;
    actualizeStats();

    getPlayerName();
    gameArea.setAttribute("onclick", "missedShoot()");
    gameArea.style.cursor = "crosshair";
    actualizeStats();

    setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 30);

}
let date = new Date();
console.log(date);
initialize()



// highscore json blob: https://jsonblob.com/_WSTAW_SWOJ_HASH_JSON"

// resztę zaimplementuj sam :-)
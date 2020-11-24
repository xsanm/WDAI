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
let audio1 = new Audio('sounds/balloon-pop.mp3');
let audio2 = new Audio('sounds/shoot-bow.mp3');


function initialize() {
    gameArea.setAttribute("onclick", "missedShoot()");
    gameArea.style.cursor = "crosshair";
    //getPlayerName();
    setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 30);
}

function missedShoot() {
    console.log("niecelny strzal");
    missedShoots++;
    shoots++;

    points -= 5;
    //setPoints();


    //audio2.play();

    //setShootsNumber();
    //setRedBackground();
    actualizeStats();
}

function setBackground() {
    document.getElementById("gameArea").style.background = '#ff5c33';
    /*(async() => {
            await setTimeout(() => { document.getElementById("gameArea").style.background = 'white' }, 100);
        })();*/

    setTimeout(() => { document.getElementById("gameArea").style.background = 'white' }, 100);
}



//typ
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
        //setShootsNumber();
        //setShootedBallonNumber();
        //generateBalloons();
        //setTimeout("generateBalloons()", 150 + (30 - balloonCounter) * 100);
    } else {
        if (document.getElementById(id) != null) {
            document.getElementById(id).remove();
            console.log("czas minal " + id + " nietrafiony");
            //generateBalloons();
        }
    }
    if (balloonCounter < 30) {
        setTimeout("generateBalloons()", 100 + (30 - balloonCounter) * 20);
    } else {
        console.log("koniec");
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

/*function setBallonNumber() {
    document.getElementById("roundBox").innerHTML = currentBallon;
}

function setShootsNumber() {
    document.getElementById("shootsFiredBox").innerHTML = shoots;
    setAccuracy();
}

function setShootedBallonNumber() {
    document.getElementById("hitBox").innerHTML = shootedBallons;
}

function setAccuracy() {
    document.getElementById("accuracyBox").innerHTML = (shootedBallons * 100 / shoots).toFixed(2);;
}

function setPoints() {
    document.getElementById("pointsBox").innerHTML = points;
}
*/

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

    /*(async() => {
        await setTimeout("balloonEvent(null, false," + balloonCounter + ")", 3000);
    })()*/



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


//generateBalloons();
//generateBalloons();
//generateBalloons();
//generateBalloons();
//generateBalloons();




initialize()





// highscore json blob: https://jsonblob.com/_WSTAW_SWOJ_HASH_JSON"

// resztę zaimplementuj sam :-)
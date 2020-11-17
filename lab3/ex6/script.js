fetch("http://localhost:3000/people").then(response => response.json()).then(data => foo(data));


function foo(data) {
    //console.log(data);
    for (i of data) {
        document.getElementById("p1").innerHTML += (i.name + i.name.length + "  " + i.age + '<br>');
    }
    let sum = 0;
    for (i of data) {
        sum += parseInt(i.age, 10);
    }
    document.getElementById("p2").innerHTML = sum / data.length + '<br>';
    for (i of data) {
        if (i.name.includes("r") || i.name.includes("R")) {
            document.getElementById("p3").innerHTML += (i.name) + '<br>';
        }
    }

    data.sort(function(x, y) { return Number(x.age) - Number(y.age) });

    document.getElementById("p4").innerHTML = data[data.length - 2].name + '<br>';
    document.getElementById("p4").innerHTML += data[2].name + '<br>';

}
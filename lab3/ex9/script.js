let id = 0;
let removed = 0;

function addNewContact(event) {

    id += 1;

    event.preventDefault();
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "contactElement");
    newDiv.setAttribute("id", id);


    let cName = document.createElement("p");
    cName.setAttribute("class", "contactName");

    let cNr = document.createElement("p");
    cNr.setAttribute("class", "contactNUmber");

    let delImg = document.createElement("img");
    delImg.setAttribute("src", 'img/trash-2-48.png');

    let cButton = document.createElement("button");
    cButton.setAttribute("class", "contactDelete");
    cButton.setAttribute("onclick", "delContact(this.id)");
    cButton.setAttribute("id", id);

    cButton.appendChild(delImg);
    newDiv.appendChild(cName);
    newDiv.appendChild(cNr);
    newDiv.appendChild(cButton);


    cName.innerHTML = document.getElementById("addName").value;
    cNr.innerHTML = document.getElementById("addPhone").value;

    document.getElementById("content").appendChild(newDiv);

}

function delContact(idx) {
    let divs = document.getElementById("content").childNodes;

    for (let i = 0; i < divs.length; i++) {
        if (divs[i].id == idx) {
            document.getElementById("content").removeChild(divs[i]);
        }
    }
}
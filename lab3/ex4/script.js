function addListElement() {
    let list = document.getElementById("mainList");
    let newLi = document.createElement("li");
    newLi.innerHTML = list.childNodes.length + 1;
    list.appendChild(newLi);
}

function deleteListElement() {
    let list = document.getElementById("mainList");
    if (list.childNodes.length === 0) {
        alert("You can not remove from empty List!");
    } else {
        list.removeChild(list.childNodes[0]);
        /*if (document.getElementById("renumber").checked) {
            for (let i = 0; i < list.childNodes.length; i++) {
                list.childNodes[i].innerHTML = i + 1;
            }
        }*/
    }
}
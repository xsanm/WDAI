/*
    Odczytuje pliki lokalnie, wtedy łatwiej zwyrfikować działanie,
    ppliki można umieśćic na serwerze, wtedy zmieni się jedynie URL
    pliku w fetch();

*/


function addListElmentToDOM(father, elName, onClickFunction) {
    let checkInput = document.createElement("input");
    let label2 = document.createElement("label");
    let newli = document.createElement("li");
    let newUl = document.createElement("ul");

    checkInput.setAttribute("id", elName);
    checkInput.setAttribute("onclick", onClickFunction);
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("name", elName);

    label2.setAttribute("for", elName);
    label2.innerHTML = elName;

    newli.setAttribute("id", "li" + elName);

    newli.appendChild(checkInput);
    newli.appendChild(label2);
    newli.append(newUl);

    father.appendChild(newli);
}

function addCategoryToDOM(categoryName) {

    //adding category
    addListElmentToDOM(document.getElementById("mainList"), categoryName, "clickCategory(id)");

    //adding container for products
    let btn = document.createElement("button");
    btn.setAttribute("id", "btn" + categoryName);
    btn.setAttribute("onclick", "collapse(id)");
    btn.innerHTML = "V";


    let newUl = document.createElement("ul");
    newUl.setAttribute("id", "ul" + categoryName, 1);
    document.getElementById("li" + categoryName).append(newUl);
    document.getElementById("li" + categoryName).prepend(btn);
}

function addProductToDOM(categoryName, productName) {

    //eliminating reapeted elements
    let categoryElement = document.getElementById("ul" + categoryName);
    let productElement = document.getElementById("li" + productName);
    if (productElement !== null && productElement.parentElement == categoryElement) return;

    //adding product
    addListElmentToDOM(categoryElement, productName, "clickProduct(id)");
    let newLi = document.createElement("li");
    newLi.setAttribute("id", "p" + productName);
    newLi.innerHTML = productName;
    newLi.style.display = "none";
    document.getElementById("rightList").appendChild(newLi);

}

function addCategories(data) {
    for (i of data['Categories']) {
        addCategoryToDOM(i);
    }
}

function addProducts(cat, data) {
    for (i of cat['Categories']) {
        if (data[i])
            for (j of data[i]) {
                addProductToDOM(i, j.name);
            }
    }
}

async function initialize() {
    let cat = await fetch("categories.json").then(r => r.json());
    let prodA = await fetch("productsA.json").then(r => r.json());
    let prodB = await fetch("productsB.json").then(r => r.json());

    addCategories(cat);
    addProducts(cat, prodA);
    addProducts(cat, prodB);

}



//zaznacza/odznacza kategorie i dodaje/usuwe wszystkie lementy z niej
function clickCategory(id) {
    if (document.getElementById(id).checked) {
        let nodes = document.getElementById("ul" + id).childNodes;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].childNodes[0].checked = true;
            clickProduct(nodes[i].childNodes[0].id);
        }
    } else {
        let nodes = document.getElementById("ul" + id).childNodes;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].childNodes[0].checked = false;
            clickProduct(nodes[i].childNodes[0].id);
        }
    }
}

//zaznacza/odznacza produkt + zaznacza kategorie
function clickProduct(id) {
    if (document.getElementById(id).checked) {
        let parentName = document.getElementById(id).parentElement.parentElement.id;
        parentName = parentName.substr(2, parentName.length - 2);
        document.getElementById("li" + parentName).childNodes[1].checked = true;
        document.getElementById("p" + id).style.display = "block";
    } else {
        document.getElementById("p" + id).style.display = "none";
    }

}

//zwija i rozwija liste
function collapse(id) {
    if (document.getElementById(id).innerHTML === 'V') {
        document.getElementById("ul" + id.substr(3, id.length - 3)).style.display = "none";
        document.getElementById(id).innerHTML = '>';
    } else {
        document.getElementById("ul" + id.substr(3, id.length - 3)).style.display = "block";
        document.getElementById(id).innerHTML = 'V';
    }
}


initialize();
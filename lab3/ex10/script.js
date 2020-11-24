function addListElmentToDOM(father, elName, onClickFunction) {
    let label1 = document.createElement("label");
    let checkInput = document.createElement("input");
    let label2 = document.createElement("label");
    let newli = document.createElement("li");
    let newUl = document.createElement("ul");

    checkInput.setAttribute("id", elName);
    checkInput.setAttribute("onclick", onClickFunction);
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("name", elName);

    label1.setAttribute("for", elName);
    label1.innerHTML = "V";
    label2.setAttribute("for", elName);
    label2.innerHTML = elName;

    newli.setAttribute("id", "li" + elName);

    newli.appendChild(label1);
    newli.appendChild(checkInput);
    newli.appendChild(label2);
    newli.append(newUl);

    father.appendChild(newli);
}


function addCategoryToDOM(categoryName) {

    //adding category
    addListElmentToDOM(document.getElementById("mainList"), categoryName, "");

    //adding container for products
    let newUl = document.createElement("ul");
    newUl.setAttribute("id", "ul" + categoryName);
    document.getElementById("li" + categoryName).append(newUl);
}

function addProductToDOM(categoryName, productName) {

    //eliminating reapeted elements
    let categoryElement = document.getElementById("ul" + categoryName);
    let productElement = document.getElementById("li" + productName);
    if (productElement !== null && productElement.parentElement == categoryElement) return;

    //adding product
    addListElmentToDOM(categoryElement, productName, "");
}

function addCategories(data) {
    //console.log(data);

    for (i of data['Categories']) {
        //console.log(i);
        addCategoryToDOM(i);
    }
}

function addProducts(cat, data) {
    console.log(data);
    for (i of cat['Categories']) {
        console.log(i);
        console.log(data[i]);
        if (data[i])
            for (j of data[i]) {
                addProductToDOM(i, j.name);
            }
    }
}

//fetch("productsA.json").then(r => r.json()).then(a => console.log(a["Bikes"]));

//let p = fetch("productsA.json").then(r => r.json());
//console.log(p["Bikes"]);

async function readData() {
    let cat = await fetch("categories.json").then(r => r.json());
    let prodA = await fetch("productsA.json").then(r => r.json());
    let prodB = await fetch("productsB.json").then(r => r.json());

    addCategories(cat);
    addProducts(cat, prodA);
    addProducts(cat, prodB);

    console.log(prodA);
    document.getElementById("left").innerHTML = prodA['Cars'][1].name;
    //fetch("productsA.json").then(r => r.json()).then(a => addProducts(a));
    //fetch("productsB.json").then(r => r.json()).then(a => addProducts(a));
    return cat;
}

readData();
//setTimeout("console.log(cat);", 100);
//console.log(cat);
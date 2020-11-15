function changePicture() {
    let currentImg = document.getElementById("pic1");

    if (currentImg.getAttribute('src') == 'img/mountains.jpg') {
        currentImg.setAttribute('src', 'img/see.jpg');
        currentImg.style.borderColor = 'blue';
    } else if (currentImg.getAttribute('src') == 'img/see.jpg') {
        currentImg.setAttribute('src', 'img/mountains.jpg');
        currentImg.style.borderColor = 'red';
    } else {
        console.log("Unknown error");
    }
}
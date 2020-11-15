function validateData() {
    let birthDate = Number(document.getElementById("birthdate").value.substring(0, 4));
    let retDate = Number(document.getElementById("retirementYear").value);
    let dateDiff = retDate - birthDate;

    if (document.getElementById("male").checked) {
        if (dateDiff >= 65) {
            alert("You can retire in " + retDate);
            return true;
        } else {
            alert("You can't retire in " + retDate);
            return false;
        }
    } else {
        if (dateDiff >= 60) {
            alert("You can retire in " + retDate);
            return true;
        } else {
            alert("You can't retire in " + retDate);
            return false;
        }
    }
}
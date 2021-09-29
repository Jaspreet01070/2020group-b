var createCount = 0;

function getFormItem(){

    var v1 = document.forms["cForm"]["inputName"].value;
    var v2 = document.forms["cForm"]["inputDate"].value;

    EmptyCheck(v1,v2);
}

function EmptyCheck(chk1,chk2){

    if (chk1 === "")
    {
        // if contest name is null
        alert("Please input the league name");
        return false;
    }
    else if(chk2 === "")
    {
        // if contest date is null
        alert("Please input the Date");
        return false;
    }
    else if(checkMonDate(chk2) === false){
        // if contest date is not on Monday
        alert("Please input the date on Monday.");
        return false;
    }
    else if(checkPastDate(chk2) === false)
    {
        // if contest date is in past
        alert("It's invalid date. Please input the valid date.");
        return false;
    }
    else
    {
        // create over 5 times
        if(createCount >= 5){
            alert("You already have 5 contests. Out of limit.");
            return false;
        }

        createCount++;
        // create contest successful
        alert('Create contest successful. ' + createCount);
        return true;
    }
}


// check the contest date is in the past or not
function checkPastDate(inputDate) {
    var d = new Date();

    d = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
    var d2 = new Date(inputDate);
    if (d2 == "Invalid Date") {
        alert("It's invalid date.");
        return false;
    }

    var n = d.getTime() - d2.getTime();
    if (n === 0) {
        return true;
    } else if (n > 0) {
        return false;
    } else {
        return true;
    }
}


// check the date is on Monday or not
function checkMonDate(inputDate){
    var d = new Date(inputDate);

    if(d.getDay() == 0) // Sun.
        return false;
    else if(d.getDay() == 1) // Mon.
        return true;
    else if(d.getDay() == 2) // Tus.
        return false;
    else if(d.getDay() == 3) // Wed.
        return false;
    else if(d.getDay() == 4) // Thur.
        return false;
    else if(d.getDay() == 5) // Fri.
        return false;
    else // Sat.
        return false;

}

module.exports = {
    getFormItem,
    EmptyCheck
};
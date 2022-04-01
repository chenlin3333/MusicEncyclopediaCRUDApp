function onSignIn() {
    if (validate()) {
        var formData = readFormData();
        Console.log(formData["userName"]);
        Console.log(formData["passWord"]);
        
    }
}

function onRegister(){
    if (validate()){

    }
}
function readFormData() {
    var formData = {};
    formData["userName"] = document.getElementById("userName").value;
    formData["passWord"] = document.getElementById("passWord").value;
    return formData;
}

/**
 * Checks to see if the supplied username and password is not empty and are valid
 * @returns True if valid, false otherwise
 */
function validate() {
    isValid = true;
    if (document.getElementById("userName").value == "" || document.getElementById("passWord").value == "") {
        isValid = false;
        document.getElementById("signInValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("signInValidationError").classList.contains("hide")){
            document.getElementById("signInValidationError").classList.add("hide");
        }
    }
    return isValid;
}
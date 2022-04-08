"use strict";

import * as SQL from "./SqlQueries.js";

export function onSignIn() {
    if (validate()) {
        var userName = document.getElementById("userName").value;
        var passWord = document.getElementById("passWord").value;
        db.query();
        //SQL.isUserValid(userName, passWord);
        
        
    }
}

export function onRegister(){
    var userName = document.getElementById("userName").value;
    var passWord = document.getElementById("passWord").value;
    if (validate() && !SQL.userExists(userName, passWord)){

    }
}


/**
 * Checks to see if the supplied username and password is not empty and are valid
 * @returns True if valid, false otherwise
 */
function validate() {
    var isValid = true;
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

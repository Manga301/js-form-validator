const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// error input error
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    
    const small = formControl.querySelector("small");
    small.textContent = message;
}

// check email is valid
function checkEmail(input){
    const validateEmail = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    
    if(validateEmail.test(String(input.value).toLowerCase())){
        showSuccess(input);
    } else {
        showError(input, `${input.value} not a valid email address`);
    }
}

// success input 
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";

}

// check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }

    });
}

function clearFormFields(inputArr){
    inputArr.forEach(input => input.value = "" );
}

//  check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
     
}

// get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords do not match");
    }
}

// form event
form.addEventListener("submit", function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    clearFormFields([username, email, password, password2]);
});
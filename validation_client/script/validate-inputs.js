//sektoren
const form = document.getElementById('form');
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordcontrol = document.getElementById('passwordcontrol');


//error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//check phone
function checkPhone(input) {
    const re = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Mobilenummer ist nicht richtig');
    }
}


//check email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email ist nicht richtig');
    }
}

//check password
function checkPasswordMatch(input1, input2) {
    let pwd1 = input1.value.trim();
    let pwd2 = input2.value.trim();
    if (pwd1 === pwd2) {
        showSuccess(input2);
    } else {
        showError(input2, 'Zweites Passwort ist nicht korrekt');
    }
}


//check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} wird benötigt`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

//input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} muss mindestens ${min} Zeichen lang sein`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} darf nicht mehr als ${max} Zeichen enthalten`
        );
    } else {
        showSuccess(input);
    }
}


//get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
    if (!checkRequired([name, lastname, username, phone, email, password, passwordcontrol])) {

        checkLength(name, 2, 20);
        checkLength(lastname, 2, 50);
        checkLength(username, 2, 16);
        checkLength(password, 6, 25);

        checkPhone(phone);
        checkEmail(email);
        checkPasswordMatch(password, passwordcontrol);
    }
}


// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});
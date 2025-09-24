const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    if (small) small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

// Check email is valid
function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.trim());
}

// Check required fields
function checkRequired(inputs) {
    let allFilled = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            allFilled = false;
        } else {
            showSuccess(input);
        }
    });
    return allFilled;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// Check passwords match
function checkPasswordsMatch(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'Passwords do not match');
        return false;
    }
    return true;
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const requiredValid = checkRequired([username, email, password, password2]);
    const usernameValid = checkLength(username, 3, 15);
    const passwordValid = checkLength(password, 6, 25);
    const emailValid = isEmailValid(email.value);
    if (!emailValid) showError(email, 'Email is not valid');
    else showSuccess(email);
    const passwordsMatch = checkPasswordsMatch(password, password2);

    if (requiredValid && usernameValid && passwordValid && emailValid && passwordsMatch) {
        // Form is valid, you can submit or process further here
        // form.submit(); // Uncomment to submit
    }
});
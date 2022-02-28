const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password1E2 = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordMatch = false;

const validateForm = () => {
  // using Constraint Validation API
  isValid = form.checkValidity();
  if (!isValid) {
    // style main message for error
    message.textContent = 'Please fill out all fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }
  // check if password match
  if (password1El.value === password1E2.value) {
    passwordMatch = true;
    password1.style.borderColor = 'green';
    password2.style.borderColor = 'green';
  } else {
    passwordMatch = false;
    message.textContent = 'Make sure password matches.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1.style.borderColor = 'red';
    password2.style.borderColor = 'red';
    return;
  }
  // If form is valid and password matches
  if (isValid && passwordMatch) {
    message.textContent = 'Successfully Registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
};

const storeFormData = () => {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  };
  // Do something with data
  console.log(user);
};

const processFormData = (e) => {
  e.preventDefault();
  validateForm();
  if (isValid && passwordMatch) {
    storeFormData();
  }
};

form.addEventListener('submit', processFormData);
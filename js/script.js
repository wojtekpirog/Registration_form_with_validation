let username;
let password;
let passwordRepeat;
let email;
let clearBtn;
let submitBtn;
let formPopup;

const main = () => {
  getElements();
  addListeners();
}

const getElements = () => {
  username = document.querySelector("#username");
  password = document.querySelector("#password");
  passwordRepeat = document.querySelector("#password-repeat");
  email = document.querySelector("#email");
  clearBtn = document.querySelector(".form__button--reset");
  submitBtn = document.querySelector(".form__button--submit");
  formPopup = document.querySelector(".form__popup");
}

const addListeners = () => {
  clearBtn.addEventListener("click", handleFormClear);
  submitBtn.addEventListener("click", handleFormSubmit);
}

const handleFormClear = (event) => {
  event.preventDefault();
  const formFields = [username, password, passwordRepeat, email];

  formFields.forEach((field) => {field.value = ""});
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  const formFieldsArray = [
    {fieldName: "username", minLength: 3},
    {fieldName: "password", minLength: 8},
    {fieldName: "passwordRepeat", minLenght: 8},
    {fieldName: "email", minLenght: 8}
  ];
  
  checkForm([username, password, passwordRepeat, email]);
  checkLength(username, 3);
  checkLength(password, 8);
  checkLength(passwordRepeat, 8);
  checkLength(email, 10);
}

const checkForm = (formFields) => { 
  formFields.forEach((field) => {
    if (field.value === "") {
      showError(field, field.placeholder);
    } else {
      hideError(field);
    }
  });
}

const checkLength = (field, minLength) => {
  const label = field.previousElementSibling;

  if (field.value.length < minLength) {
    showError(field, `${label.textContent} musi zawierać co najmniej ${minLength} znaków.`);
  }
}

const showError = (field, message) => {
  field.classList.add("error");
  field.nextElementSibling.style.display = "block";
  field.nextElementSibling.textContent = message;
}

const hideError = (field) => {
  field.classList.remove("error");
  field.nextElementSibling.style.display = "none";
  field.nextElementSibling.textContent = ""; 
}

window.addEventListener("DOMContentLoaded", main);
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

  const formFields = [
    {input: username},
    {input: password},
    {input: passwordRepeat},
    {input: email}
  ];

  formFields.forEach((field) => {field.input.value = ""});
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  const formFields = [
    {input: username, minLength: 5},
    {input: password, minLength: 8},
    {input: passwordRepeat, minLength: 8},
    {input: email, minLength: 8}
  ];

  checkForm(formFields);
  formFields.forEach((field) => checkLength(field.input, field.minLength));
  checkPasswordEquality(password, passwordRepeat);
}

const checkForm = (formFields) => { 
  formFields.forEach((field) => {
    if (field.input.value === "") {
      showError(field.input, field.input.placeholder);
    } else {
      hideError(field.input);
    }
  });
}

const checkLength = (input, minLength) => {
  const label = input.previousElementSibling;

  if (input.value.length < minLength) {
    showError(input, `${label.textContent.slice(0, -2)} musi zawierać co najmniej ${minLength} znaków.`);
  }
}

const checkPasswordEquality = (password, passwordRepeat) => {
  if (password.value !== passwordRepeat.value) {
    showError(passwordRepeat, "Hasła nie są identyczne");
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
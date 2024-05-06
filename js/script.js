let username;
let password;
let passwordRepeat;
let email;
let clearBtn;
let submitBtn;
let formPopup;
let formPopupBtn;

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
  formPopupBtn = document.querySelector(".form__popup-button");
}

const addListeners = () => {
  clearBtn.addEventListener("click", handleFormClear);
  submitBtn.addEventListener("click", handleFormSubmit);
  formPopupBtn.addEventListener("click", closePopup);
}

const handleFormClear = (event) => {
  event.preventDefault();

  const formFields = [
    {input: username},
    {input: password},
    {input: passwordRepeat},
    {input: email}
  ];

  formFields.forEach((field) => {
    field.input.value = "";
    hideError(field.input);
  });
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
  checkLength(formFields);
  checkPasswordEquality(password, passwordRepeat);
  checkEmail(email);
  checkErrors();
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

const checkLength = (formFields) => {
  formFields.forEach((field) => {
    const label = field.input.previousElementSibling;
    
    if (field.input.value.length < field.minLength) {
      showError(field.input, `${label.textContent.slice(0, -2)} musi zawierać znaki w liczbie minimum ${field.minLength}`);
    }
  });
}

const checkPasswordEquality = (password, passwordRepeat) => {
  if (password.value !== passwordRepeat.value) {
    showError(passwordRepeat, "Hasła nie są identyczne");
  }
}

const checkEmail = (input) => {
  const regexp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  
  if (!regexp.test(input.value)) {
    showError(input, "Niepoprawny adres email");
  } else {
    hideError(input);
  }
}

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form__input");
  let errorCount = 0;

  allInputs.forEach((input) => { 
    if (input.classList.contains("error")) {
      errorCount += 1;
    }
  });

  if (errorCount === 0) {
    formPopup.classList.add("form__popup--active");
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

const closePopup = () => {
  formPopup.classList.remove("form__popup--active");
}

window.addEventListener("DOMContentLoaded", main);
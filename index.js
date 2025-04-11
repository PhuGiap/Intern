const radioDivs = document.querySelectorAll(".form__query-option");
const formGroups = document.querySelectorAll(".form__group");
const formElement = document.querySelector("form");
const toast = document.querySelector(".toast");
let formValid = true;

formElement.setAttribute("novalidate", "");

// Functions

const changeRadioBg = () => {
  radioDivs.forEach(radioDiv => {
    const radio = radioDiv.querySelector("input");
    if (radio.checked) {
      radioDiv.classList.add("radio-selected");
    } else {
      radioDiv.classList.remove("radio-selected");
    }
  });
};

const displayError = (formGroup, errorClass) => {
  const errorMessage = formGroup.querySelector(errorClass);
  errorMessage.classList.remove("form__error--hidden");
};

const removeError = (formGroup) => {
  const errorMessages = formGroup.querySelectorAll(".form__error");
  errorMessages.forEach(error => {
    error.classList.add("form__error--hidden");
  });
};

const validateGroup = (formGroup) => {
  const input = formGroup.querySelector("input, textarea");
  const inputType = input?.type || input?.tagName?.toLowerCase() || "text";

  switch (inputType) {
    case "radio":
      let checked = false;
      const radioInputs = formGroup.querySelectorAll("input");

      radioInputs.forEach(input => {
        if (input.checked) {
          checked = true;
        }
      });
      if (!checked) {
        displayError(formGroup, ".form__error");
        formValid = false;
      }
      break;

    case "checkbox":
      const checkInput = formGroup.querySelector("input");

      if (!checkInput.checked) {
        displayError(formGroup, ".form__error");
        formValid = false;
      }
      break;

    case "text":
      const textInput = formGroup.querySelector("input");
      if (textInput.value.trim() === "") {
        displayError(formGroup, ".form__error");
        formValid = false;
      }
      break;

    case "textarea":
      const textareaInput = formGroup.querySelector("textarea");

      if (textareaInput.value.trim() === "") {
        displayError(formGroup, ".form__error");
        formValid = false;
      }
      break;

    case "email":
      const emailInput = formGroup.querySelector("input");
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailInput.value.trim() === "") {
        displayError(formGroup, ".form__error--empty");
        formValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        displayError(formGroup, ".form__error--valid");
        formValid = false;
      }
      break;

    default:
      break;
  }
};

const displayToast = () => {
    toast.classList.remove("toast--hidden");
  
    setTimeout(() => {
      toast.classList.add("toast--hidden");
    }, 4000);
  };

// Event listeners

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('showToast') === 'true') {
    displayToast();
    localStorage.removeItem('showToast');
  }
});

radioDivs.forEach(radioDiv => {
  radioDiv.addEventListener("click", () => {
    const radioInput = radioDiv.querySelector("input");
    radioInput.checked = true;
    changeRadioBg();
    removeError(radioDiv.closest(".form__group"));
  });
});

formElement.addEventListener("submit", event => {
  event.preventDefault();
  formValid = true;

  formGroups.forEach(formGroup => {
    validateGroup(formGroup);
  });

  if (formValid) {
    localStorage.setItem('showToast', 'true');
    formElement.submit();
  }
});

formGroups.forEach(formGroup => {
  const inputs = formGroup.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("click", () => {
      removeError(formGroup);
    });

    input.addEventListener("blur", () => {
      validateGroup(formGroup);
    });
  });
});

toast.addEventListener("click", () => {
  toast.classList.add("form__toast--hidden");
});

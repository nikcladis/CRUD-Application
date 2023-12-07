import { saveUser } from "./eventHandlers";

// Get the form and its input fields
const saveForm = document.forms.saveForm;
const { name, username, email, city, zipcode, phone } = saveForm;

let isFormSubmitted = false;

// Generate the form values object
const generateValues = () => {
  const data = new FormData(saveForm);
  return {
    name: data.get("name"),
    username: data.get("username"),
    email: data.get("email"),
    address: {
      city: data.get("city"),
      zipcode: data.get("zipcode")
    },
    phone: data.get("phone")
  };
};

// Validation functions for specific fields
const isValidZip = (zip) => {
  const regex = /^[0-9-]+$/;
  return regex.test(zip);
};

const isValidPhone = (phone) => {
  const regex = /^[0-9\s()-]+$/;
  return regex.test(phone);
};

const isValidCity = (city) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(city);
};

// Set error message and styling if input is invalid
const setValidationError = (input, condition, errorKey, errorMessage) => {
  const errorElement = document.getElementById(errorKey);

  if (condition) {
    input.classList.add("error-input");
    errorElement.textContent = errorMessage;
    return { [errorKey]: errorMessage };
  } else {
    input.classList.remove("error-input");
    errorElement.textContent = "";
    return {};
  }
};

// Validate entire form and collect errors
const validateForm = (values) => {
  const errors = {
    ...setValidationError(
      name,
      values.name.length < 5,
      "nameError",
      "Name should be more than 5 characters"
    ),
    ...setValidationError(
      username,
      values.username.length < 5,
      "usernameError",
      "Username should be more than 5 characters"
    ),
    ...setValidationError(
      email,
      !values.email.includes("@"),
      "emailError",
      "Email should include @"
    ),
    ...setValidationError(
      city,
      !isValidCity(values.address.city),
      "cityError",
      "You must add a city"
    ),
    ...setValidationError(
      zipcode,
      !isValidZip(values.address.zipcode),
      "zipError",
      "Zipcode must only be digits or a hyphen"
    ),
    ...setValidationError(
      phone,
      !isValidPhone(values.phone),
      "phoneError",
      "You must add a phone number"
    )
  };

  // Display error messages on the page
  Object.entries(errors).forEach(([key, value]) => {
    document.getElementById(key).textContent = value;
  });

  // Check if there are any errors in the form
  return !Object.values(errors).some(Boolean);
};

// Add listeners for input change to validate in real-time
[name, username, email, city, zipcode, phone].forEach((input) => {
  input.addEventListener("input", () => {
    validateSingleInput(input);
  });
});

// Validate a single input field
const validateSingleInput = (input) => {
  if (!isFormSubmitted) return;

  switch (input.name) {
    case "name":
      setValidationError(
        name,
        name.value.length < 5,
        "nameError",
        "Name should be more than 5 characters"
      );
      break;
    case "username":
      setValidationError(
        username,
        username.value.length < 5,
        "usernameError",
        "Username should be more than 5 characters"
      );
      break;
    case "email":
      setValidationError(
        email,
        !email.value.includes("@"),
        "emailError",
        "Email should include @"
      );
      break;
    case "city":
      setValidationError(
        city,
        !isValidCity(city.value),
        "cityError",
        "You must add a city"
      );
      break;
    case "zipcode":
      setValidationError(
        zipcode,
        !isValidZip(zipcode.value),
        "zipError",
        "Zipcode must only be digits or a hyphen"
      );
      break;
    case "phone":
      setValidationError(
        phone,
        !isValidPhone(phone.value),
        "phoneError",
        "You must add a phone number"
      );
      break;
    default:
      break;
  }
};

// Function to save the user's data to an external source
const saveInformation = (values) =>
  fetch("https://jsonplaceholder.typicode.com/users", {
    body: JSON.stringify(values),
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

// Handle the save button click event
const saveBtn = document.getElementById("saveBtn");

saveBtn.onclick = () => {
  isFormSubmitted = true;
  const values = generateValues();
  if (validateForm(values)) {
    saveInformation(values);
    saveUser(values);
    saveForm.reset();
    isFormSubmitted = false;
  }
};

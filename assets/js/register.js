//  ___Header Typewriter__

let txt = `Register your business anywhere in the world  in one click`;
let msg = document.getElementById("msg");
let i = 0;
let typing = () => {
  if (i < txt.length) {
    setInterval(function () {
      msg.textContent += txt.charAt(i);
      i++;
    }, 50);
  }
};

typing();

// Registration Form

let selectedCountry;
const selectedStates = [];
const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const suggestions = document.getElementById("suggestions");
const result = document.getElementById("result");
const registrationForm = document.getElementById("registration-form");
const selectedCountryInput = document.getElementById("selected-country");
const statesDropdown = document.getElementById("state");

// Define an array to store country names
let countryNames = [];
var headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "a0J0NWxodXRoY1F3amx3WFRRbFFyZEc0NGNya0x3N21TbngyWmNCZw=="
);

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};
fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    countryNames = data;
    // for debugging
    // console.log(countryNames);
  })
  .catch((error) => console.error("Error fetching countries:", error));

// Function to filter country suggestions
function filterSuggestions() {
  let inputText = countryInp.value.toLowerCase();
  let matchedCountries = countryNames.filter((country) =>
    country.name.toLowerCase().includes(inputText)
  );

  // Clear previous suggestions
  suggestions.innerHTML = "";

  // Add matched countries to suggestions
  matchedCountries.forEach((country) => {
    let suggestionItem = document.createElement("div");
    suggestionItem.className = "suggestion-item";
    suggestionItem.textContent = country.name;
    suggestionItem.addEventListener("click", () => {
      selectedCountryInput.value = country.name;
      fetchStates(country);
      selectedCountry = country;
      // for debugging
      // console.log(country);
      countryInp.value = country.name;
      suggestions.innerHTML = "";
    });
    suggestions.appendChild(suggestionItem);
  });

  // Show or hide the suggestions box
  suggestions.style.display = matchedCountries.length > 0 ? "block" : "none";
}

// Event listener for input changes
countryInp.addEventListener("input", filterSuggestions);

function fetchStates(country) {
  let countryName = countryInp.value;
  let finalURL = `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`;
  fetch(finalURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populateStatesDropdown(data);
      console.log(data);
      selectedCountry = data[0];
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>Coud'nt fect states</h3>`;
      } else {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
}
const stateDropdown = document.getElementById("state");
const stateInput = document.getElementById("stateInput");
stateDropdown.addEventListener("change", function () {
  stateInput.value = stateDropdown.value;
});

function populateStatesDropdown(states) {
  statesDropdown.innerHTML = "";

  // Add default option
  // let defaultOption = document.createElement("option");
  // defaultOption.value = "";
  // defaultOption.text = "Select State";
  // statesDropdown.add(defaultOption);

  // Add states to the dropdown
  // selectedStates = selectedCountry.states;
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select State";
  stateDropdown.add(defaultOption);

  // Add states to the dropdown
  states.forEach((state) => {
    let option = document.createElement("option");
    option.value = state.name;
    option.text = state.name;
    stateDropdown.add(option);
  });
}

// Event listener for state dropdown click
// statesDropdown.addEventListener("click", () => {
//   console.log("Selected Country:", selectedCountry);
//   populateStatesDropdown(selectedCountry.states);
// });

// function populateStatesDropdown(states) {
//   // Clear previous options
//   statesDropdown.innerHTML = "";

//   // Add default option
//   let defaultOption = document.createElement("option");
//   defaultOption.value = "";
//   defaultOption.text = "Select State";
//   statesDropdown.add(defaultOption);

//   // Add states to the dropdown
//   states.forEach((state) => {
//     let option = document.createElement("option");
//     option.value = state;
//     option.text = state;
//     statesDropdown.add(option);
//   });
// }

// Form submission

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const companytype = document.getElementById("companytype").value;
    const businessname = document.getElementById("businessname").value;
    const entity = document.getElementById("entity").value;
    const industry = document.getElementById("industry").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("selected-country").value;
    const state = document.getElementById("state").value;

    // FormData object
    const formData = new FormData();
    formData.append("companytype", companytype);
    formData.append("businessname", businessname);
    formData.append("entity", entity);
    formData.append("industry", industry);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("state", state);

    fetch("https://derex.onrender.com/business", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        if (data.message === "Business created successfully") {
          window.location.href = "/templates/payments/pay-option.html";
        } else {
          const failureMessage = document.getElementById("faildMsg");
          failureMessage.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error sending data to the server:", error);
      });
  });
});

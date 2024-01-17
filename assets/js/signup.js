function validateName() {
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  const name = nameInput.value.trim();

  if (name.length < 3 || name.length > 30) {
    nameError.textContent = "Name must be between 3 and 30 characters";
  } else {
    nameError.textContent = "";
  }
}

function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const email = emailInput.value.trim();

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    emailError.textContent = "Invalid email format";
  } else {
    emailError.textContent = "";
  }
}

function validatePassword() {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");
  const password = passwordInput.value;

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
  } else {
    passwordError.textContent = "";
  }
}

function validateRetypePassword() {
  const passwordInput = document.getElementById("password");
  const retypePasswordInput = document.getElementById("retypePassword");
  const retypePasswordError = document.getElementById("retypePasswordError");
  const password = passwordInput.value;
  const retypePassword = retypePasswordInput.value;

  if (password !== retypePassword) {
    retypePasswordError.textContent = "Passwords do not match";
  } else {
    retypePasswordError.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");

  // Check if the user is already logged in
  // const token = localStorage.getItem("token");
  // if (token) {
  //   fetchUserProfile(token);
  // }

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form input values
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const successMessage = document.getElementById("successMessage");
    const failure = document.getElementById("faildMsg");
    const emailExist = document.getElementById("emailExist");

    // Validate
    validateName();
    validateEmail();
    validatePassword();
    validateRetypePassword();

    const required = {
      username: username,
      email: email,
      password: password,
    };

    fetch("https://derex.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(required),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.message === "Verification token created successfully") {
          successMessage.style.display = "block";

          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data.userData));
          localStorage.setItem("userId", data.userData.id);

          console.log("Submission was successful!");
          // Redirect to the confirmation page or handle as needed
          window.location.href = "/templates/signUp/confirm-Code.html";
        } else if (data.message === "Username already exists!") {
          failure.style.display = "block";
        } else {
          failure.style.display = "block";
          console.log("Submission failed.");
        }
      })
      .catch((error) => {
        // for network issues or API errors
        console.error("What could be wrong?🤔:", error);
      });
  });
});

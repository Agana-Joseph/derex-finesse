document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  // Check if the user is already logged in
  const token = localStorage.getItem("token");
  if (token) {
    // Fetch user information using token
    fetchUserInfo(token);
  }

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form input values
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const successMessage = document.getElementById("successMessage");
    const nameExist = document.getElementById("nameExist");
    const emailExist = document.getElementById("E-exist");

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

          // Save the token in localStorage
          localStorage.setItem("token", data.token);

          // Save user data in localStorage for future use
          localStorage.setItem("userData", JSON.stringify(data.userData));

          // Redirect to the verification code page
          setTimeout(function () {
            window.location.href = "/templates/signUp/confirm-Code.html";
          }, 2000);
          console.log("Submission was successful!");
        } else if (data.error === "Username already exists!") {
          nameExist.style.display = "block";
          // alert(nameExist.textContent);
        } else if (data.error === "Email already exists!") {
          emailExist.style.display = "block";
          // alert(emailExist.textContent);
        } else {
          failureMessage.style.display = "block";
          console.log("Submission failed.");
        }
      })
      .catch((error) => {
        // for network issues or API errors
        console.error("What could be wrong?🤔:", error);
      });
  });
  localStorage.setItem("token", data.token);

  fetchUserInfo(data.token);
});

// verification form
const verificationForm = document.getElementById("verification-form");

verificationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const verification_code = document.getElementById("verification-code").value;
  const code = Number(verification_code);
  const token = localStorage.getItem("token");

  fetch("https://derex.onrender.com/verify_code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      code: code,
    }),
  })
    .then((response) => response.json())
    .then((verificationData) => {
      console.log(code);
      console.log(typeof code);
      console.log("Verification Response:", verificationData);

      const successMessage = document.getElementById("successMessage");
      const failureMessage = document.getElementById("failureMessage");

      if (verificationData.message === "Verified") {
        successMessage.style.display = "block";
        setTimeout(function () {
          console.log(code);
          window.location.href = "/dashboard/Dashboard/dashboard.html";
        }, 2000);
        console.log("User authorized 🤩!");
      } else if (verificationData.message === "Invalid or expired code!") {
        console.log(code);
        failureMessage.style.display = "block";
        console.log("Invalid or expired code!");
      } else {
        failureMessage.style.display = "block";
        console.log("Submission failed.");
      }
    })
    .catch((error) => {
      console.error("Verification Error:", error);
    });
});

// Login form
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validation logic here (if needed)

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("https://derex.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        fetchUserInfo(data.token);
      }
      console.log("Response status:", data);
      if (data.message === "Logged in successfully!") {
        setTimeout(function () {
          window.location.href = "/dashboard/Dashboard/dashboard.html";
        }, 2000);
        console.log("Login successful!");
      } else if (data.message === "Invalid username/password!") {
        const resetModal = document.getElementById("reset-modal");
        resetModal.style.display = "block";
        console.log("Invalid username!");
      } else {
        // modal for password reset or try again
        const resetPasswordButton = document.getElementById("reset-password");
        const tryAgainButton = document.getElementById("try-again");

        resetPasswordButton.addEventListener("click", function () {
          // Redirect to the password reset page
          window.location.href = "/signUp/forgotPassword";
        });

        tryAgainButton.addEventListener("click", function () {
          // Close the modal and allow the user to try again
          resetModal.style.display = "none";
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error instanceof Response) {
        console.error("Status code:", error.status);
        if (error.status === 401) {
          console.error("Unauthorized access.");
        } else {
          // Log the server response text for further debugging
          error.text().then((errorMessage) => {
            console.error("Server response:", errorMessage);
          });
        }
      } else {
        console.error("Network error or other issue.");
      }
    });

  function fetchUserInfo(token) {
    fetch("https://derex.onrender.com/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        localStorage.setItem("userData", JSON.stringify(userData[0]));
        userName.textContent = "";
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  }
});

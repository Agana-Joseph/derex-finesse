document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form input values
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const successMessage = document.getElementById("successMessage");
    const failure = document.getElementById("faildMsg");

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

// verification form
const verificationForm = document.getElementById("verification-form");

verificationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const code = document.getElementById("verification-code").value;
  const token = localStorage.getItem("token");
  const codeNum = parseInt(code, 10);

  fetch("https://derex.onrender.com/verify_code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      code: codeNum,
    }),
  })
    .then((response) => response.json())
    .then((verificationData) => {
      console.log("Verification Response:", verificationData);

      const successMessage = document.getElementById("successMessage");
      const failureMessage = document.getElementById("failureMessage");

      if (verificationData.message === "Verified") {
        successMessage.style.display = "block";

        // Update localStorage with the new token and user data
        localStorage.setItem("token", verificationData.token);
        localStorage.setItem("user_id", verificationData.user_id);
        localStorage.setItem(
          "userData",
          JSON.stringify(verificationData.userData)
        );

        console.log(code);
        window.location.href = "/templates/signUp/prifile.html";
        console.log("User authorized 🤩!");
      } else if (verificationData.message === "Token not found!") {
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

// user profile
document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profile");

  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const about = document.getElementById("about").value;
    const mobile = document.getElementById("contact").value;

    // Get the user ID from local storage
    const user_id = parseInt(localStorage.getItem("user_id"), 10);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("mobile", mobile);
    formData.append("user_id", user_id);

    console.log(" type of user_id:", typeof user_id);

    fetch("https://derex.onrender.com/profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        if (data.message === "Profile created successfully") {
          window.location.href = "/dashboard/Dashboard/dashboard.html";
        } else {
          console.log("Profile not created");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  });
});

// Login form
const loginForm = document.getElementById("login-form");
function login() {
  console.log("Login function called");
}
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  function login() {
    console.log("Login function called");
  }

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
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        fetchUserInfo(data.token, user_id);
      }
      console.log("Response status:", data);
      if (data.message === "Logged in successfully!") {
        setTimeout(function () {
          window.location.href = "/dashboard/Dashboard/dashboard.html";
        }, 2000);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        console.log("Login successful!");
      } else {
        // modal for password reset or try again
        const resetModal = document.getElementById("reset-modal");
        const resetPasswordButton = document.getElementById("reset-password");
        const tryAgainButton = document.getElementById("try-again");

        resetModal.style.display = "block";

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
          console.error("Network error or other issue.");
        }
      }
    });
  login();
});

// function fetchUserInfo(token) {
//   fetch("https://derex.onrender.com/users", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((userData) => {
//       localStorage.setItem("userData", JSON.stringify(userData[0]));
//       userName.textContent = "";
//     })
//     .catch((error) => {
//       console.error("Error fetching user information:", error);
//     });
// }

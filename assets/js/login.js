function validateField(inputId, errorId, errorMessage) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  const value = input.value.trim();

  error.textContent =
    (inputId === "username" && value.length < 3) ||
    (inputId === "password" && value.length < 6)
      ? errorMessage
      : "";
}

function validatePassword() {
  validateField("password", "passwordError", "Password is required");
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const resetModal = document.getElementById("faildMsg");
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
        // Save the token and user ID in local storage
        localStorage.setItem("token", data.token);
      }

      console.log("Response status:", data);
      if (data.message === "Logged in successfully!") {
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "/dashboard/Dashboard/dashboard.html";
        console.log("Login successful!");
      } else if (
        data.error === "Invalid password!" ||
        data.error === "Invalid email!"
      ) {
        resetModal.style.display = "block";

        // You can add logic here to handle password reset or other actions
        // resetPasswordButton.addEventListener("click", function () {
        //   window.location.href = "/signUp/forgotPassword";
        // });

        // tryAgainButton.addEventListener("click", function () {
        //   resetModal.style.display = "none";
        // });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error instanceof Response) {
        console.error("Status code:", error.status);
        if (error.status === 401) {
          console.error("Unauthorized access.");
        } else {
          console.error("Network error or something though.");
        }
      }
    });
});

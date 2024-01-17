// async function login() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const response = await fetch("https://derex.onrender.com/admin/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username: email, password: password }),
//   });

//   const data = await response.json();
//   console.log("Respons:", data);

//   if (data.response === "Logged in successfully!") {
//     console.log("Login success");
//     localStorage.setItem("token", data.token);

//     window.location.href = "/admin/dashboard";
//   } else {
//     console.log("login error");
//     alert("Invalid credentials");
//   }
// }

const loginForm = document.getElementById("adminLogin");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // function login() {
  //   console.log("Login function called");
  // }

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://derex.onrender.com/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response status:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.message === "Logged in successfully!") {
        setTimeout(function () {
          window.location.href = "/dashboard/Dashboard/dashboard.html";
        }, 2000);
        console.log("Login successful!");
      } else {
        console.log("Login error");
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

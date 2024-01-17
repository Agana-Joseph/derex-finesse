document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profile");

  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const about = document.getElementById("about").value;
    const mobile = document.getElementById("contact").value;

    // const spawn = require("child_process").spawn;
    // const userId = spawn("python", ["./app.py", 718]);
    // Get the user ID from local storage
    const user_id = parseInt(localStorage.getItem("user_id"), 10);
    console.log("User ID from local storage:", user_id);
    console.log(" type of user_id:", typeof user_id);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("mobile", mobile);
    formData.append("user_id", user_id);

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

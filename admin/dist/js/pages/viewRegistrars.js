const home = "What happened";
console.log("home");
document.addEventListener("DOMContentLoaded", function () {
  fetchregistrars();

  function fetchregistrars() {
    fetch("https://derex.onrender.com/business")
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);

        displayDataInTable(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }

  // Function to display data in the table
  function displayDataInTable(data) {
    const tbody = document.getElementById("registerBD");

    tbody.innerHTML = "";

    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${item.email}</td>
          <td>${item.businessname}</td>
          <td>${item.companytype}</td>
          <td>${item.entity}</td>
          <td>${item.industry}</td>
          <td>${item.country}</td>
          <td>${item.state}</td>
        `;
      tbody.appendChild(tr);
    });
  }
});

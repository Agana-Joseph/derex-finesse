function fetchUsers() {
  fetch("https://derex.onrender.com/users")
    .then((response) => response.json())
    .then((data) => {
      updateTable(data);
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

function updateTable(users) {
  const tableBody = document.getElementById("userTableBody");
  // Clear existing rows
  tableBody.innerHTML = "";

  // Append new rows
  users.forEach((user) => {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
          <td><a href="#">${user.id}</a></td>
          <td>${user.username}</td>
          <td><span class="badge badge-success">${user.status}</span></td>
          <td>
            <div class="sparkbar" data-color="#00a65a" data-height="20">${user.email}</div>
          </td>
        `;
  });
}

// Fetch users initially
fetchUsers();

// Update users every 5 seconds
setInterval(fetchUsers, 5000);

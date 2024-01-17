// Notification
document.addEventListener("DOMContentLoaded", function () {
  function ServiceRequests() {
    fetch("https://derex.onrender.com/service")
      .then((response) => response.json())
      .then((data) => {
        updateNotificationCount(data.length);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }

  function updateNotificationCount(count) {
    const notificationCountElement = document.getElementById("serviceCount");

    // Update the notification count
    notificationCountElement.textContent = count;
  }

  ServiceRequests();
  setInterval(ServiceRequests, 9000);
});

document.addEventListener("DOMContentLoaded", function () {
  function getRegisters() {
    fetch("https://derex.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        updateNotificationCount(data.length);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }

  function updateNotificationCount(count) {
    const notificationCountElement = document.getElementById("registersCount");

    // Update the notification count
    notificationCountElement.textContent = `${count} New registers`;
  }

  getRegisters();
  setInterval(getRegisters, 9000);
});

// Total count for notifications
document.addEventListener("DOMContentLoaded", function () {
  function fetchCountsAndUpdateNotification() {
    // Fetch the counts for both service requests and user registrations
    const serviceRequestsPromise = fetch("https://derex.onrender.com/service")
      .then((response) => response.json())
      .then((data) => data.length)
      .catch((error) => {
        console.error("Error fetching service requests count:", error);
        return 0; // Default to 0 if there is an error
      });

    const userRegistrationsPromise = fetch("https://derex.onrender.com/users")
      .then((response) => response.json())
      .then((data) => data.length)
      .catch((error) => {
        console.error("Error fetching user registrations count:", error);
        return 0; // Default to 0 if there is an error
      });

    // Update the notification count when both counts are fetched
    Promise.all([serviceRequestsPromise, userRegistrationsPromise]).then(
      ([serviceRequestsCount, userRegistrationsCount]) => {
        const totalCount = serviceRequestsCount + userRegistrationsCount;
        updateNotificationCount(totalCount);
      }
    );
  }

  function updateNotificationCount(count) {
    const notificationCountElement =
      document.getElementById("notificationCount");

    // Update the notification count
    notificationCountElement.textContent = count;
  }

  // Fetch the initial counts and set up an interval to periodically update them
  fetchCountsAndUpdateNotification();
  setInterval(fetchCountsAndUpdateNotification, 9000); // Adjust the interval as needed
});

// List of registered users
document.addEventListener("DOMContentLoaded", function () {
  const activeUsers = document.getElementById("activeUsersCount");

  function fetchUsers() {
    fetch("https://derex.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        displayUsers(data);
        // console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  function displayUsers(users) {
    const userTableBody = document.getElementById("userTableBody");

    userTableBody.innerHTML = "";
    activeUsers.textContent = users.length;

    users.forEach((user) => {
      const newRow = userTableBody.insertRow();
      newRow.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td><span class="badge badge-${user.statusClass}">${user.status}</span></td>
                <td>${user.email}</td>
            `;
    });
  }

  fetchUsers();
  setInterval(fetchUsers, 9000);
});

// Services in progress
document.addEventListener("DOMContentLoaded", function () {
  var inProgressSpan = document.getElementById("inProgress");

  fetch("https://derex.onrender.com/service")
    .then((response) => response.json())
    .then((data) => {
      inProgressSpan.textContent = data.length;
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// Total services

document.addEventListener("DOMContentLoaded", function () {
  const services = document.querySelectorAll(".info-box-number");

  const sum = 0;

  services.forEach(function (element) {
    sum += parseInt(element.textContent);
    console.log(sum);
  });

  const total = document.getElementById("total");
  total.textContent = sum;
});

document.addEventListener("DOMContentLoaded", function () {
  function fetchContacts() {
    fetch("https://derex.onrender.com/contacts")
      .then((response) => response.json())
      .then((data) => {
        displayContacts(data);
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }

  // display contacts datas
  function displayContacts(contacts) {
    const contactTableBody = document.getElementById("contactListBody");
    contactTableBody.innerHTML = "";

    contacts.forEach((contact, index) => {
      const newRow = contactTableBody.insertRow(index);
      newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>
          <a>${contact.firstname} ${contact.lastname}</a>
          <br />
          <small>Created ${contact.created_at}</small>
        </td>
        <td>${contact.email}</td>
        <td class="project_progress">
          <p>${contact.description}</p>
          <div class="progress progress-sm">
            <div class="progress-bar bg-green" role="progressbar" 
              aria-valuenow="${contact.progress}" aria-valuemin="0" 
              aria-valuemax="100" style="width: ${contact.progress}%">
            </div>
          </div>
          <small>${contact.progress}% Complete</small>
        </td>
        <td class="project-state">
          <span class="badge badge-success">${contact.status}</span>
        </td>
        <td class="project-actions text-right">
          <a class="btn link-active btn-sm" href="${
            contact.id
          }" target="_blank">
            <i class="fas fa-folder"></i> View
          </a>
        </td>
      `;
    });
  }

  // To download File

  fetchContacts();

  // Update contacts every 5 seconds
  setInterval(fetchContacts, 5000);
});

// downloadFile js

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("contactListBody");

  tableBody.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element has the class "download"
    if (target.classList.contains("download")) {
      // Get the corresponding row's data
      const row = target.closest("tr");
      const userId = row.dataset.userId; // Add a data attribute to your HTML to store the user ID
      if (userId) {
        // Call the function to download the file
        downloadFile(userId);
      }
    }
  });

  function downloadFile(userId) {
    fetch(`https://derex.onrender.com/download/contactsfile/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a link element and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `user_file_${userId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  }
});

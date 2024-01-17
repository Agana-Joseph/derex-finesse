// Check if values exist in localStorage on page load
window.onload = function () {
  const storedName = localStorage.getItem("solName");
  const storedDescription = localStorage.getItem("solDiscription");
  const storedAddress = localStorage.getItem("solAddress");
  const storedImageName = localStorage.getItem("defaultImageName");

  if (storedName && storedDescription && storedAddress) {
    updateForm(storedName, storedDescription, storedAddress, storedImageName);
  }
};

function updateWalletDetails() {
  const solName = document.getElementById("inputName").value;
  const solDiscription = document.getElementById("inputDescription").value;
  const solAddress = document.getElementById("wallet").value;

  // Upload image logic
  const solFileInput = document.getElementById("fileUpload");
  const solQrcode = solFileInput.files[0];

  // Convert image to data URL
  const reader = new FileReader();

  reader.onload = function (e) {
    const solimageDataURL = e.target.result;

    // Save the data URL to localStorage
    localStorage.setItem("solImageUrl", solimageDataURL);
  };

  reader.readAsDataURL(solQrcode);

  // Save the default image name if it doesn't exist
  const defaultImageName = localStorage.getItem("defaultImageName");
  if (!defaultImageName) {
    localStorage.setItem("defaultImageName", solQrcode.name);
  }

  localStorage.setItem("solName", solName);
  localStorage.setItem("solDiscription", solDiscription);
  localStorage.setItem("solAddress", solAddress);

  updateForm(solName, solDiscription, solAddress, solQrcode.name);
}

function updateForm(name, description, address, imageName) {
  document.getElementById("inputName").value = name;
  document.getElementById("inputDescription").value = description;
  document.getElementById("wallet").value = address;
  document.getElementById("fileUpload").value = imageName;
}

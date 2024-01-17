// Check if values exist in localStorage on page load
window.onload = function () {
  const storedName = localStorage.getItem("ethName");
  const storedDescription = localStorage.getItem("ethDiscription");
  const storedAddress = localStorage.getItem("ethAddress");
  const storedImageName = localStorage.getItem("defaultImageName");

  if (storedName && storedDescription && storedAddress) {
    updateForm(storedName, storedDescription, storedAddress, storedImageName);
  }
};

function updateWalletDetails() {
  const ethName = document.getElementById("inputName").value;
  const ethDiscription = document.getElementById("inputDescription").value;
  const ethAddress = document.getElementById("wallet").value;

  // Upload image logic
  const ethFileInput = document.getElementById("fileUpload");
  const ethQrcode = ethFileInput.files[0];

  // Convert image to data URL
  const reader = new FileReader();

  reader.onload = function (e) {
    const ethimageDataURL = e.target.result;

    // Save the data URL to localStorage
    localStorage.setItem("ethImageUrl", ethimageDataURL);
  };

  reader.readAsDataURL(ethQrcode);

  // Save the default image name if it doesn't exist
  const defaultImageName = localStorage.getItem("defaultImageName");
  if (!defaultImageName) {
    localStorage.setItem("defaultImageName", ethQrcode.name);
  }

  localStorage.setItem("ethName", ethName);
  localStorage.setItem("ethDiscription", ethDiscription);
  localStorage.setItem("ethAddress", ethAddress);

  updateForm(ethName, ethDiscription, ethAddress, ethQrcode.name);
}

function updateForm(name, description, address, imageName) {
  document.getElementById("inputName").value = name;
  document.getElementById("inputDescription").value = description;
  document.getElementById("wallet").value = address;
  document.getElementById("fileUpload").value = imageName;
}

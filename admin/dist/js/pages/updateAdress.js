// Check if values exist in localStorage on page load
window.onload = function () {
  const storedName = localStorage.getItem("walletName");
  const storedDescription = localStorage.getItem("walletDescription");
  const storedAddress = localStorage.getItem("walletAddress");
  const storedImageName = localStorage.getItem("defaultImageName");

  if (storedName && storedDescription && storedAddress) {
    updateForm(storedName, storedDescription, storedAddress, storedImageName);
  }
};

function updateWalletDetails() {
  const walletName = document.getElementById("inputName").value;
  const walletDescription = document.getElementById("inputDescription").value;
  const walletAddress = document.getElementById("wallet").value;

  // Upload image logic
  const fileInput = document.getElementById("fileUpload");
  const uploadedImage = fileInput.files[0];

  // Convert image to data URL
  const reader = new FileReader();

  reader.onload = function (e) {
    const imageDataURL = e.target.result;

    // Save the data URL to localStorage
    localStorage.setItem("uploadedImageDataURL", imageDataURL);
  };

  reader.readAsDataURL(uploadedImage);

  // Save the default image name if it doesn't exist
  const defaultImageName = localStorage.getItem("defaultImageName");
  if (!defaultImageName) {
    localStorage.setItem("defaultImageName", uploadedImage.name);
  }

  localStorage.setItem("walletName", walletName);
  localStorage.setItem("walletDescription", walletDescription);
  localStorage.setItem("walletAddress", walletAddress);

  updateForm(walletName, walletDescription, walletAddress, uploadedImage.name);
}

function updateForm(name, description, address, imageName) {
  document.getElementById("inputName").value = name;
  document.getElementById("inputDescription").value = description;
  document.getElementById("wallet").value = address;
  document.getElementById("fileUpload").value = imageName;
}

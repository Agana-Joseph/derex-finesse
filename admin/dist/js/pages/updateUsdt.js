// Check if values exist in localStorage on page load
window.onload = function () {
  const storedName = localStorage.getItem("usdtName");
  const storedDescription = localStorage.getItem("usdtDiscription");
  const storedAddress = localStorage.getItem("usdtAddress");
  const storedImageName = localStorage.getItem("defaultImageName");

  if (storedName && storedDescription && storedAddress) {
    updateForm(storedName, storedDescription, storedAddress, storedImageName);
  }
};

function updateWalletDetails() {
  const usdtName = document.getElementById("inputName").value;
  const usdtDiscription = document.getElementById("inputDescription").value;
  const usdtAddress = document.getElementById("wallet").value;

  // Upload image logic
  const usdtFileInput = document.getElementById("fileUpload");
  const usdtQrcode = usdtFileInput.files[0];

  // Convert image to data URL
  const reader = new FileReader();

  reader.onload = function (e) {
    const usdtimageDataURL = e.target.result;

    // Save the data URL to localStorage
    localStorage.setItem("usdtImageUrl", usdtimageDataURL);
  };

  reader.readAsDataURL(usdtQrcode);

  // Save the default image name if it doesn't exist
  const usdtImageName = localStorage.getItem("usdtImageName");
  if (!usdtImageName) {
    localStorage.setItem("usdtImageName", usdtQrcode.name);
  }

  localStorage.setItem("usdtName", usdtName);
  localStorage.setItem("usdtDiscription", usdtDiscription);
  localStorage.setItem("usdtAddress", usdtAddress);

  updateForm(usdtName, usdtDiscription, usdtAddress, usdtQrcode.name);
}

function updateForm(name, description, address, imageName) {
  document.getElementById("inputName").value = name;
  document.getElementById("inputDescription").value = description;
  document.getElementById("wallet").value = address;
  document.getElementById("fileUpload").value = imageName;
}

function updateWalletDetails() {
  const usdcName = document.getElementById("inputName").value;
  const usdcDiscription = document.getElementById("inputDescription").value;
  const usdcAddress = document.getElementById("wallet").value;

  // Upload image logic
  const usdcFileInput = document.getElementById("fileUpload");
  const usdcQrcode = usdcFileInput.files[0];

  // Convert image to data URL
  const reader = new FileReader();

  reader.onload = function (e) {
    const usdcimageDataURL = e.target.result;

    // Save the data URL to localStorage
    localStorage.setItem("usdcImageUrl", usdcimageDataURL);
  };

  reader.readAsDataURL(usdcQrcode);

  // Save the default image name if it doesn't exist
  const usdcImageName = localStorage.getItem("usdcImageName");
  if (!usdcImageName) {
    localStorage.setItem("usdcImageName", usdcQrcode.name);
  }

  localStorage.setItem("usdcName", usdcName);
  localStorage.setItem("usdcDiscription", usdcDiscription);
  localStorage.setItem("usdcAddress", usdcAddress);

  updateForm(usdcName, usdcDiscription, usdcAddress, usdcQrcode.name);
}

// Check if values exist in localStorage on page load
window.onload = function () {
  const usdcName = localStorage.getItem("usdcName");
  const usdcDiscription = localStorage.getItem("usdcDiscription");
  const usdcAddress = localStorage.getItem("usdcAddress");
  const usdcImageName = localStorage.getItem("usdcImageName");

  if (usdcName || usdcDiscription || usdcAddress || usdcImageName) {
    updateForm(usdcName, usdcDiscription, usdcAddress, usdcImageName);
  }
};

function updateForm(name, description, address, imageName) {
  document.getElementById("inputName").value = name;
  document.getElementById("inputDescription").value = description;
  document.getElementById("wallet").value = address;
  document.getElementById("fileUpload").value = imageName;
}

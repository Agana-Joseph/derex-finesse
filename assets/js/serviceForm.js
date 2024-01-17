// To proccess the form before user make payment
function submitForm() {
  const businessName = document.getElementById("business-name").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const country = document.getElementById("country-name").value;
  const email = parseInt(document.getElementById("email").value, 10);
  const companyType = document.getElementById("conpany-type").value;
  const entityEnding = document.getElementById("entity-end").value;
  const failureMessage = document.getElementById("failureMessage");

  // form data
  const formData = new FormData();
  formData.append("country", country);
  formData.append("company_type", companyType);
  formData.append("business_name", businessName);
  formData.append("entity", entityEnding);
  formData.append("phone_number", phoneNumber);
  formData.append("email", email);

  fetch("https://derex.onrender.com/service", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      if (data.message === "Service created successfully") {
        window.location.href = "/templates/payments/payment.html";
        console.log("Success!");
      } else {
        failureMessage.style.display = "block";
        console.log("Unable to submit form");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

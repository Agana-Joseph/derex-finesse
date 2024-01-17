const consultantButton = document.getElementById("consultant");
const registration = document.getElementById("register");
const development = document.getElementById("develop");
const digitalization = document.getElementById("digitalization");

consultantButton.addEventListener("click", function () {
  window.location.href = "/templates/sevices/consultant.html";
});
registration.addEventListener("click", function () {
  window.location.href = "/templates/sevices/registration.html";
});
development.addEventListener("click", function () {
  window.location.href = "/templates/sevices/development.html";
});
digitalization.addEventListener("click", function () {
  window.location.href = "/templates/sevices/digitalization.html";
});

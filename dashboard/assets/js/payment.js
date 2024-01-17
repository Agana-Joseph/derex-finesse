const fiatPay = document.getElementById("card-pay");
fiatPay.addEventListener("click", function () {
  window.location.href = "/templates/payments/payment.html";
});
const crypto = document.getElementById("crypto");
crypto.addEventListener("click", function () {
  window.location.href = "/templates/payments/crypto/options.html";
});

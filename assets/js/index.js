// Blog clickable

// Locate: cloud based solution
var portfolioImg = document.getElementById("portfolioCloud1");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/Cloud-Based.html";
});

var portfolioImg = document.getElementById("portfolioSecurity2");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/security.html";
});

var portfolioImg = document.getElementById("portfolioCloud2");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/migratingTocloud.html";
});

var portfolioImg = document.getElementById("portfolioAutomat1");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/PowerofAutomation.html";
});

var portfolioImg = document.getElementById("portfolioScurity1");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/cyberExellence.html";
});

var portfolioImg = document.getElementById("portfolioCloud3");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/cloudProvider.html";
});

var portfolioImg = document.getElementById("portfolioAutomat2");

portfolioImg.addEventListener("click", function () {
  window.location.href = "/templates/blog/automatedDocument.html";
});

// console.log(localStorage.getItem("userData"));
console.log(JSON.parse(localStorage.getItem("userData")));

document.addEventListener("DOMContentLoaded", function () {
  var modeSwitch = document.querySelector(".mode-switch");

  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    modeSwitch.classList.toggle("active");
  });

  var listView = document.querySelector(".list-view");
  var gridView = document.querySelector(".grid-view");
  var projectsList = document.querySelector(".project-boxes");

  listView.addEventListener("click", function () {
    gridView.classList.remove("active");
    listView.classList.add("active");
    projectsList.classList.remove("jsGridView");
    projectsList.classList.add("jsListView");
  });

  gridView.addEventListener("click", function () {
    gridView.classList.add("active");
    listView.classList.remove("active");
    projectsList.classList.remove("jsListView");
    projectsList.classList.add("jsGridView");
  });

  document
    .querySelector(".messages-btn")
    .addEventListener("click", function () {
      document.querySelector(".messages-section").classList.add("show");
    });

  document
    .querySelector(".messages-close")
    .addEventListener("click", function () {
      document.querySelector(".messages-section").classList.remove("show");
    });
});

// navBar Toogle

const appIcon = document.getElementById("app-icon");
appIcon.addEventListener("click", function () {
  window.location.href = "/index.html";
});
const add = document.getElementById("add-btn");
add.addEventListener("click", function () {
  window.location.href = "/templates/sevices/services.html";
});
const profileBtn = document.getElementById("profileBtn");
const logOut = document.getElementById("logOut");
profileBtn.addEventListener("click", function () {
  logOut.style.display = "block";
});

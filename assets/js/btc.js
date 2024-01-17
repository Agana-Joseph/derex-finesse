$(document).ready(function () {
  var $demo = $(".demo");
  var $items = $(".demo__items");
  var $line = $(".demo__line");
  var $printer = $(".printer");
  var $printerItemCont = $(".printer__item-cont");

  var maxDragY = 150;
  var minDragY = 60;
  var printerInitY = -90;
  var dragResistance = 0.6;
  var deltaY = 0;
  var printing = false;

  var printStep1AT = 0.3;
  var printStep2Delay = printStep1AT + 0.1;
  var printStep2AT = 1.8;
  var printStep3Delay = printStep2Delay + printStep2AT;
  var printStep3AT = 0.55;
  var printFullAT = printStep3Delay + printStep3AT;

  var itemsInfo = [
    {
      heading: "Our Twitter",
      amount: "@DerexFinesse1",
      amountLink: "https://twitter.com/DerexFinesse1",
      info: "Follow us on Twitter!",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/twitter big icon.png",
      details: "How is your day?",
      when: "Just now",
      imgBackColor: "#1DA1F2",
    },
    {
      heading: "Our Instagram",
      amount: "@derex_finesse",
      amountLink: "https://www.instagram.com/derex_finesse/",
      info: "You can follow us on instagram!",
      img: "https://i.pinimg.com/474x/5c/e6/89/5ce6893a5f1cf32457ceef20f299ba60.jpg",
      details: "Hi!",
      when: "It's been a while",
      imgBackColor: "#ea4c89",
    },
    {
      heading: "Other demos",
      amount: "My reciep sample",
      amountLink: "dhttps://derexfinesse.com",
      info: "Sample of reciept upload",
      img: "/",
      details: "Hola",
      when: "666 min",
      imgBackColor: "#000",
    },
  ];

  var itemCounter = 0;
  var $itemBoilerplate = $(".item--boilerplate");

  function generateNewItem() {
    var $item = $itemBoilerplate.clone();
    var $itemFront = $(".item__front", $item);
    var data = itemsInfo[itemCounter];
    itemCounter++;
    if (itemCounter > 2) itemCounter = 0;

    $item.removeClass("item--boilerplate");

    Object.keys(data).forEach(function (prop) {
      var $el = $(".item__" + prop, $itemFront);
      var val = data[prop];

      if (prop === "imgBackColor") return;
      if (prop === "img") {
        $el.attr("src", val);
      } else if (prop === "amountLink") {
        $el.attr("href", val);
      } else {
        $el.text(val);
      }
    });

    $(".item__back .item__img", $item).css("background", data.imgBackColor);

    return $item;
  }

  function insertNewItem() {
    var $newItem = generateNewItem();

    $printerItemCont.empty();
    $printerItemCont.append($newItem);
  }

  insertNewItem();

  function cloneAndPlacePrintedItem() {
    var $printedItem = $(".item--in-printer");
    var $clone = $printedItem.clone();
    var itemOffsets = $printedItem.offset();
    var demoOffsets = $demo.offset();
    var left = itemOffsets.left - demoOffsets.left;
    var top = itemOffsets.top - demoOffsets.top;

    $clone.removeClass("item--in-printer").addClass("s--cloned");
    $clone.css({ left: left, top: top });

    $demo.append($clone);

    setTimeout(function () {
      var $finalClone = $clone.clone();
      $finalClone.attr("style", "");
      $finalClone.removeClass("s--cloned");

      $items.prepend($finalClone);
      insertNewItem();

      setTimeout(function () {
        $clone.remove();
      }, 50);
    }, printStep3AT * 1000);
  }

  function runPrintAnimation() {
    $demo.addClass("s--printing");

    setTimeout(function () {
      cloneAndPlacePrintedItem();
      $demo.css("top");
      $demo.addClass("s--printing-step-3");
    }, printStep3Delay * 1000);
  }

  $(document).on("mousedown touchstart", ".demo__items", function (e) {
    if (printing) return;
    console.log("click touch");
    var startY = e.pageY || e.originalEvent.touches[0].pageY;

    $items.addClass("s--no-select");

    $(document).on("mousemove touchmove", function (e) {
      e.preventDefault();
      var y = e.pageY || e.originalEvent.touches[0].pageY;
      deltaY = (y - startY) * dragResistance;

      if (deltaY < 0) deltaY = 0;
      if (deltaY > maxDragY) deltaY = maxDragY;

      var progress = deltaY / maxDragY;
      var printerY = printerInitY * progress * -1;

      $items.css("transform", "translate3d(0," + deltaY + "px,0)");
      $line.css("transform", "scaleX(" + Math.sqrt(progress) + ")");
      $printer.css("transform", "translate3d(0," + printerY + "px,0)");
    });

    $(document).on("mouseup touchend", function () {
      $(document).off("mousemove touchmove mouseup touchend");
      $items.removeClass("s--no-select");
      if (!deltaY) return;

      printing = true;
      var _printAT = printFullAT;

      if (deltaY >= minDragY) {
        runPrintAnimation();
      } else {
        $demo.addClass("s--reset");
        _printAT = printStep1AT;
      }

      setTimeout(function () {
        $demo.removeClass("s--printing s--printing-step-3 s--reset");
        $items.attr("style", "");
        $line.attr("style", "");
        $printer.attr("style", "");

        printing = false;
        deltaY = 0;
      }, _printAT * 1000);
    });
  });
});

// prove of payment

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");

  uploadButton.addEventListener("click", function () {
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("https://derex.onrender.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected.");
    }
  });
});

// ... (previous code)

const walletName = localStorage.getItem("walletName") || "BTC";
const walletDescription =
  localStorage.getItem("walletDescription") ||
  "Please copy the address to clipboard to avoid sending to the wrong address.";
const walletAddress =
  localStorage.getItem("walletAddress") ||
  "btc-ht1ccohnocececeyoulikewhataf*kisthat-btc";
const qrCodeDataURL = localStorage.getItem("uploadedImageDataURL");

document.getElementById("displayWalletAddress").innerText = walletAddress;
document.getElementById("displayWalletDescription").innerText =
  walletDescription;

// Update the QR code image
const qrCodeImage = document.getElementById("qrCode");
qrCodeImage.src = qrCodeDataURL || "/assets/img/QR-code.png";

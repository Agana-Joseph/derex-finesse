document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  var prevButton = document.getElementById("swiper-prev");
  var nextButton = document.getElementById("swiper-next");

  prevButton.addEventListener("click", function () {
    mySwiper.slidePrev();
  });

  nextButton.addEventListener("click", function () {
    mySwiper.slideNext();
  });
});

//  file name:app.js
// Parisa Modirshahla
// Student number: 301138044
// Date: september 21, 2021 



// initial carousel for home page
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  nav: false,
  dots: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
  },
});

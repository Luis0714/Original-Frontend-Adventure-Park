document.addEventListener('DOMContentLoaded', function () {
  
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});

  var elem = document.querySelectorAll('.carousel');
  var instance = M.Carousel.init(elem, {});
})



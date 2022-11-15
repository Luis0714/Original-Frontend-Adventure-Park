document.addEventListener('DOMContentLoaded', function () {
  
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});


  let lis = document.querySelectorAll('.dropdown-trigger');
  console.log(lis);
  var instanc = M.Dropdown.init(lis, {});

  //var instanc = M.Dropdown.init(ele, {});

  var elem = document.querySelectorAll('.carousel');
  var instance = M.Carousel.init(elem, {});
})


function iniciarMenuDesplegable(){
  let lis = document.querySelectorAll('.dropdown-trigger');
  console.log(lis);
  var instanc = M.Dropdown.init(lis, {});
}
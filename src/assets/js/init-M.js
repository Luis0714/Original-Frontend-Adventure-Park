document.addEventListener('DOMContentLoaded', function () {
  
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});


  let lis = document.querySelectorAll('.dropdown-trigger');
  console.log(lis);
  var instanc = M.Dropdown.init(lis, {});

  //var instanc = M.Dropdown.init(ele, {});

  var elem = document.querySelectorAll('.carousel');
  var instance = M.Carousel.init(elem, {
    indicators:true,
    fullWidth:true
  });
  var xs = document.querySelectorAll('.slider');
  var ins = M.Slider.init(xs, {
    interval:4000,
  });
})


function OpenConfirmModal(message) {
  document.querySelector("#pConfirmationMessage").innerHTML = message;
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems, {});
  let elem = document.querySelector("#modalConfirmation");
  var instance = M.Modal.getInstance(elem);
  instance.open();
}

/**
     *método que para una lista seleccionable, devuelve un objeto con información sobre el índice del      elemento seleccionado, el valor único que debería identificar al elemento y el texto del mismo
     * @param {*} selector 
     * @returns 
     */
      function selectedItemList (selector) {
      const list = document.querySelector(selector)
      const item = list.options[list.selectedIndex]

      return {
          selectedIndex: list.selectedIndex,
          value: item.value,
          text: item.text,
      }
  }
  /**
   *  método que permite asignar elementos a una lista desplegable a partir de un array de objetos
   * @param {*} selector 
   * @param {*} items 
   * @param {*} value 
   * @param {*} text 
   * @returns 
   */
  /*
  function populateSelectList(selector, items = [], value = '', text = '',firstOption = '') {
      let list = document.querySelector(selector)
      list.options.length = 0

      if (firstOption) {
          list.add(new Option(firstOption, ''))
      }
      items.forEach(item => list.add(new Option(item[text], item[value])))
      return list // <-- OJO
  }



    const departments = await Helpers.fetchData('data/colombia.json')
        const arraydepartments = [
                ...new Map(
                   departments.map(item => [item.DEPARTAMENTO, item.DEPARTAMENTO])
            ).values()
            ]

            





              const lista = NewPopulateSelectList("#departamentos", arraydepartments, "departamento de origen")*/

// HELPER FUNCTIONS:
const deleteElementByKey = (array, key, value) => {
  console.log(array);
  console.log(key);
  console.log(value);
  return array.filter(obj => obj[key] !== value);
}
const addEventListenerForButtons = (buttons) => {
  buttons.forEach(button => {
    button.addEventListener("click", ()=> {
      let divItem = button.parentElement;
      let quantityItem = divItem.querySelector('.quantity');
      let currentQuantity = parseFloat(quantityItem.innerText);

      if (button.classList.contains('addbutton')) {
        quantityItem.innerText = currentQuantity += 1;
        } else if (button.classList.contains('lessbutton')) {
        quantityItem.innerText = currentQuantity -=1;
        } else if (button.classList.contains('deletebutton')) {
       const removeItem = divItem.children[1].innerText;
        // Obtener la ultima version de la lista del localStorage
        savedFruits = JSON.parse(localStorage.getItem('ls-fruits'));
        // Actualizar la lista (eliminar el elemento)
        let updatedSavedFruits = deleteElementByKey(savedFruits, 'itemName', removeItem);
        //eliminar el item del HTML.
        divItem.remove();
        // Guardar la nueva version de la lista
        console.log('updatedSavedFruits', updatedSavedFruits);
        localStorage.setItem('ls-fruits', JSON.stringify(updatedSavedFruits));
        };
    });
  });
}

// ADD NEW HARDCODED ITEM
// 1. Definir lista de objetos de categoria frutas
// const f = [
//   {itemName: "Apple", itemQuantity: "1"},
//   {itemName: "Orange", itemQuantity: "2"},
//   {itemName: "Banana", itemQuantity: "3"}
// ];

// GET UPDATED LOCAL STORAGE FRUIT LIST IF LIST EXISTS
const getLocalStorageFruitList = () => {
  let savedFruitsAuxiliar = []; // si no hay nada dentro del localStorage, devuelve esta lista vacia
  let localStorageData = localStorage.getItem('ls-fruits'); // obtengo objeto del localStorage
  if (localStorageData != null) {
    savedFruitsAuxiliar = JSON.parse(localStorageData); // convierte la cadena json en un objeto.
  };
  return savedFruitsAuxiliar;
}
// 1.A) Guardar lista de objetos en localStorage
//localStorage.setItem('ls-fruits', JSON.stringify(f)); convierte el objeto en una cadena string JSON
let savedFruits = getLocalStorageFruitList();

// 1.B) Obtener lista de objetos en localStorage
// llamo a la funcion getLocalStorage

// 2. Recorrer la lista de objetos recuperada con un forEach
savedFruits.forEach(fruit => {
// 3. Seleccionar el elemento adentro del cual vamos a insertar los items
  const fruitsCategories = document.querySelector("#fruits");
// 4. Insertar los items
  fruitsCategories.insertAdjacentHTML('afterbegin', `<div class="item">
  <input type="checkbox" class="checkbox">
  <p> ${fruit.itemName} </p>
  <p class="quantity"> ${fruit.itemQuantity} </p>
  <button class="lessbutton">-</button>
  <button class="addbutton">+</button>
  <button class="deletebutton"> Delete </button>
</div>`);
});

// add new item button

const addNewButtons = document.querySelectorAll(".addnew");
addNewButtons.forEach(addNewButton => {
  addNewButton.addEventListener("click", () => {
    // 1. Al apretar un boton poner alert para ingresar nombre de nuevo item.
    let newItem = prompt('Which item do you want to add?');
     // 2. Al aceptar agregarlo a la lista de items abajo del ultimo item en el HTML.
    addNewButton.insertAdjacentHTML('beforebegin', `<div class="item">
          <input type="checkbox" class="checkbox">
          <p>${newItem}</p>
          <p class="quantity">1</p>
          <button class="lessbutton">-</button>
          <button class="addbutton">+</button>
          <button class="deletebutton"> Delete </button>
      </div>`);
    let parentElementAddNewItem = addNewButton.parentElement;
    let lastAddedItem = parentElementAddNewItem.querySelector('div:nth-last-child(2)');
    let lastAddedItemButtons = lastAddedItem.querySelectorAll('button');
    addEventListenerForButtons(lastAddedItemButtons);

    // 3. Guardar el new item en el localStorage para que la proxima vez que se cargue quede guardado:
    // 3.1 Buscar la lista en el localStorage (listItem).
    savedFruits = getLocalStorageFruitList();
    // 3.2 Agregar el new item a la lista con push. Tiene que ser un objeto (nombre q ingresa el user y cantidad fijada)
    let newItemObject = {itemName: newItem, itemQuantity: "1"};
    savedFruits.push(newItemObject);
    console.log('savedFruits', savedFruits);
    // 3.3 Guardar en localStorage la lista actualizada
    localStorage.setItem('ls-fruits', JSON.stringify(savedFruits));
  });
});


// modify quantity

const buttons = document.querySelectorAll("button");


addEventListenerForButtons(buttons);


// checkbox
const checkboxes = document.querySelectorAll(".checkbox");
const items = document.querySelectorAll(".item");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", (event) => {
    let parent = checkbox.parentElement;
    if (parent.children[1].style.textDecoration === "line-through"){
      parent.children[1].style.textDecoration = "none";
    } else {
      parent.children[1].style.textDecoration = "line-through";
    }
    });
});

// toggle categories
const category = document.querySelectorAll("h3");

category.forEach(category => {
  category.addEventListener("click", ()=> {
    let categoryItems = category.parentElement;
    let items = categoryItems.children[1];
    console.log("hiciste click");
    if (items.style.display === "none") {
        items.style.display = "flex";
      } else {
       items.style.display = "none";
      }
    });
});

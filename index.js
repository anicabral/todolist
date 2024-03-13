
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
        if (quantityItem.innerText > 1) {
          quantityItem.innerText = currentQuantity - 1;
        };
        } else if (button.classList.contains('deletebutton')) {
       const removeItem = divItem.children[1].innerText;
        savedFruits = JSON.parse(localStorage.getItem('ls-fruits'));
        let updatedSavedFruits = deleteElementByKey(savedFruits, 'itemName', removeItem);
        divItem.remove();
        localStorage.setItem('ls-fruits', JSON.stringify(updatedSavedFruits));
        };
    });
  });
}

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
// localStorage.setItem('ls-fruits', JSON.stringify(f)); convierte el objeto en una cadena string JSON
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

// ADD NEW ITEM BUTTON

const addNewButtons = document.querySelectorAll(".addnew");
addNewButtons.forEach(addNewButton => {
  addNewButton.addEventListener("click", () => {
    let newItem = prompt('Which item do you want to add?');
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

    // 3. Save new item in localStorage for next time
    savedFruits = getLocalStorageFruitList(); // 3.1 Search la lista en el localStorage (listItem).
    let newItemObject = {itemName: newItem, itemQuantity: "1"}; // 3.2 Add new item  to list.
    savedFruits.push(newItemObject);
    console.log('savedFruits', savedFruits);
    localStorage.setItem('ls-fruits', JSON.stringify(savedFruits)); // 3.3 Save in localStorage updated list
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

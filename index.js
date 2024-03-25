// HELPER FUNCTIONS ==========================================
const checkElement = (list, itemNameCheck) => {
  list.forEach(item => {
      if (item.itemName === itemNameCheck){
        if (item.checked){
          item.checked = false;
        } else {
          item.checked = true;
        }
      }
  });
  return list;
};

const deleteElementByKey = (array, key, value) => {
  return array.filter(obj => obj[key] !== value);
}
const addEventListenerForButtons = (buttons, localStorageKeyName) => {
  buttons.forEach(button => {
    button.addEventListener("click", ()=> {
      let divItem = button.closest('.item');
      if (button.classList.contains('deletebutton')) {
        const itemToRemove = divItem.querySelector('.item-name-check p').innerText;
        let savedTasks = getLocalStorageList(localStorageKeyName);
        let updatedSavedTasks = deleteElementByKey(savedTasks, 'itemName', itemToRemove);
        divItem.remove();
        localStorage.setItem(localStorageKeyName, JSON.stringify(updatedSavedTasks));
      };
    });
  });
}

const addEventListenerForCheckboxes = (checkboxes) => {
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
      let parent = checkbox.parentElement;
      if (parent.children[1].style.textDecoration === "line-through"){
        parent.children[1].style.textDecoration = "none";
      } else {
        parent.children[1].style.textDecoration = "line-through";
      }
      // 1. obtain what is currently in local storage.
      savedTodays = JSON.parse(localStorage.getItem("ls-todays"));
      // 2. obtain name of task to be checked or unchecked.
      let taskToCheck = parent.children[1].innerText;
      // 3. checked or unchecked task in array
      let checkedSavedTodays = checkElement(savedTodays, taskToCheck);
      // 4. save to localstorage
      localStorage.setItem('ls-todays', JSON.stringify(checkedSavedTodays));
      });
  });
};

// get updated local storage
const getLocalStorageList = (listName) => {
  let savedListAuxiliar = []; // si no hay nada dentro del localStorage, devuelve esta lista vacia
  let localStorageData = localStorage.getItem(listName); // obtengo objeto del localStorage
  if (localStorageData != null) {
    savedListAuxiliar = JSON.parse(localStorageData); // convierte la cadena json en un objeto.
  };
  return savedListAuxiliar;
}


// RENDER CATEGORIES ==========================================

let savedTodays = getLocalStorageList('ls-todays');
savedTodays.forEach(today => {
  const todaysSection = document.querySelector("#todays");
  let textDecoration = "none";
  let isChecked = "";
  if(today.checked){
    textDecoration = "line-through";
    isChecked = "checked";
    };
  todaysSection.insertAdjacentHTML('afterbegin', `<div class="item">
                                                      <div class="item-name-check">
                                                       <input type="checkbox" class="checkbox" ${isChecked}>
                                                        <p style="text-decoration: ${textDecoration}"> ${today.itemName} </p>
                                                      </div>
                                                      <button class="deletebutton"> Delete </button>
                                                    </div>`);
  let localStorageKeyName = 'ls-todays';

  let buttons = todaysSection.querySelectorAll("button");
  addEventListenerForButtons(buttons, localStorageKeyName);

  let checkboxes = todaysSection.querySelectorAll(".checkbox");
  let items = todaysSection.querySelectorAll(".item");
  addEventListenerForCheckboxes(checkboxes);
});

let savedWeeks = getLocalStorageList('ls-week');
savedWeeks.forEach(week => {
  const weekSection = document.querySelector("#weeks");
  let textDecoration = "none";
  let isChecked = "";
  if(week.checked){
    textDecoration = "line-through";
    isChecked = "checked";
    };
  weekSection.insertAdjacentHTML('afterbegin', `<div class="item">
                                                      <div class="item-name-check">
                                                       <input type="checkbox" class="checkbox" ${isChecked}>
                                                        <p style="text-decoration: ${textDecoration}"> ${week.itemName} </p>
                                                      </div>
                                                      <button class="deletebutton"> Delete </button>
                                                    </div>`);
  let localStorageKeyName = 'ls-week';

  let buttons = weekSection.querySelectorAll("button");
  addEventListenerForButtons(buttons, localStorageKeyName);

  let checkboxes = weekSection.querySelectorAll(".checkbox");
  let items = weekSection.querySelectorAll(".item");
  addEventListenerForCheckboxes(checkboxes);
});

// toggle categories
const category = document.querySelectorAll("h3");

category.forEach(category => {
  category.addEventListener("click", ()=> {
    let categoryItems = category.parentElement;
    let items = categoryItems.children[1];
    if (items.style.display === "none") {
        items.style.display = "flex";
      } else {
       items.style.display = "none";
      }
    });
});

// ADD NEW ITEM BUTTON ======================================================

const addNewButtons = document.querySelectorAll(".addnew");
addNewButtons.forEach(addNewButton => {
  addNewButton.addEventListener("click", () => {
    let divToAddItemId = addNewButton.parentElement.id;
    let newItem = prompt('Which item do you want to add?');
    if(newItem === ""){
      alert('you cant add an empty task');
    }else {
      addNewButton.insertAdjacentHTML('beforebegin', `<div class="item">
                                                        <div class="item-name-check">
                                                          <input type="checkbox" class="checkbox">
                                                          <p>${newItem}</p>
                                                        </div>
                                                        <button class="deletebutton"> Delete </button>
                                                      </div>`);
      let parentElementAddNewItem = addNewButton.parentElement;
      let lastAddedItem = parentElementAddNewItem.querySelector('div:nth-last-child(2)');
      let localStorageKeyName = '';
      if(divToAddItemId === "todays"){
        localStorageKeyName = 'ls-todays';
      } else {
        localStorageKeyName = 'ls-week';
      }

      let lastAddedItemButtons = lastAddedItem.querySelectorAll('button');
      addEventListenerForButtons(lastAddedItemButtons, localStorageKeyName);
      let lastAddedItemCheckboxes = lastAddedItem.querySelectorAll('.checkbox');
      addEventListenerForCheckboxes(lastAddedItemCheckboxes);

      // 1. Obtener la version actualizada segun que lista sea. (todays o week)
      let savedTasks = getLocalStorageList(localStorageKeyName);
      // 2. Definir el objeto a insertar (itemname y true or false)
      let itemToAdd = {itemName: newItem, checked: false };
      // 3. Agregar el nuevo objeto a la lista.
      savedTasks.push(itemToAdd);
      // 4. Guardar la lista con el key que corresponda.
      localStorage.setItem(localStorageKeyName, JSON.stringify(savedTasks));
    }
  });
});

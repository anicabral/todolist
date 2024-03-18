// HELPER FUNCTIONS:
const checkElement = (list, itemNameCheck) => {
  list.forEach(item => {
      if (item.itemName === itemNameCheck){
        console.log('item checked?', item.checked);
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
const addEventListenerForButtons = (buttons) => {
  buttons.forEach(button => {
    button.addEventListener("click", ()=> {
      let divItem = button.closest('.item');
      console.log('divItem', divItem);
      if (button.classList.contains('deletebutton')) {
       const itemToRemove = divItem.querySelector('.item-name-check p').innerText;
       console.log('itemToREMOVE', itemToRemove);
        savedTodays = JSON.parse(localStorage.getItem('ls-todays'));
        let updatedSavedTodays = deleteElementByKey(savedTodays, 'itemName', itemToRemove);
        divItem.remove();
        console.log('updated SaveTodays', updatedSavedTodays);
        localStorage.setItem('ls-todays', JSON.stringify(updatedSavedTodays));
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
      savedTodays = JSON.parse(localStorage.getItem('ls-todays'));
      // 2. obtain name of task to be checked or unchecked.
      let taskToCheck = parent.children[1].innerText;
      // 3. checked or unchecked task in array
      let checkedSavedTodays = checkElement(savedTodays, taskToCheck);
      // 4. save to localstorage
      localStorage.setItem('ls-todays', JSON.stringify(checkedSavedTodays));
      });
  });
};

// GET UPDATED LOCAL STORAGE Today LIST IF LIST EXISTS
const getLocalStorageTodayList = () => {
  let savedTodaysAuxiliar = []; // si no hay nada dentro del localStorage, devuelve esta lista vacia
  let localStorageData = localStorage.getItem('ls-todays'); // obtengo objeto del localStorage
  if (localStorageData != null) {
    savedTodaysAuxiliar = JSON.parse(localStorageData); // convierte la cadena json en un objeto.
  };
  return savedTodaysAuxiliar;
}
let savedTodays = getLocalStorageTodayList();
savedTodays.forEach(today => {
  const todaysCategories = document.querySelector("#todays");
  let textDecoration = "none";
  let isChecked = "";
  if(today.checked){
    textDecoration = "line-through";
    isChecked = "checked";
    };
  todaysCategories.insertAdjacentHTML('afterbegin', `<div class="item">
                                                      <div class="item-name-check">
                                                       <input type="checkbox" class="checkbox" ${isChecked}>
                                                        <p style="text-decoration: ${textDecoration}"> ${today.itemName} </p>
                                                      </div>
                                                      <button class="deletebutton"> Delete </button>
                                                    </div>`);
});

// ADD NEW ITEM BUTTON
const addNewButtons = document.querySelectorAll(".addnew");
addNewButtons.forEach(addNewButton => {
  addNewButton.addEventListener("click", () => {
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
      let lastAddedItemButtons = lastAddedItem.querySelectorAll('button');
      addEventListenerForButtons(lastAddedItemButtons);
      let lastAddedItemCheckboxes = lastAddedItem.querySelectorAll('.checkbox');
      addEventListenerForCheckboxes(lastAddedItemCheckboxes);
      // 3. Save new item in localStorage for next time
      savedTodays = getLocalStorageTodayList(); // 3.1 Search la lista en el localStorage (listItem).
      let newItemObject = {itemName: newItem, checked: false }; // 3.2 Add new item  to list.
      savedTodays.push(newItemObject);
      localStorage.setItem('ls-todays', JSON.stringify(savedTodays)); // 3.3 Save in localStorage updated list
    }
  });
});

const buttons = document.querySelectorAll("button");
addEventListenerForButtons(buttons);


// checkbox
const checkboxes = document.querySelectorAll(".checkbox");
const items = document.querySelectorAll(".item");

addEventListenerForCheckboxes(checkboxes);


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

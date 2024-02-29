// modify quantity

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", ()=> {
    let divItem = button.parentElement;
    let quantityItem = divItem.children[2];
    let currentQuantity = parseFloat(quantityItem.innerText);

    if (button.classList.contains('addbutton')) {
      quantityItem.innerText = currentQuantity += 1;
      } else if (button.classList.contains('lessbutton')) {
      quantityItem.innerText = currentQuantity -=1;
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

// add new item
const addNewButtons = document.querySelectorAll(".addnew");

addNewButtons.forEach(button => {
  button.addEventListener("click", () => {
    let parentItem =  button.parentElement;
    console.log(parentItem);
    let newItem = prompt('Which item do you want to add?');
    button.insertAdjacentHTML('beforebegin', `<div class="item">
          <input type="checkbox" class="checkbox">
          <p>${newItem}</p>
          <p class="quantity">1</p>
          <button class="lessbutton">-</button>
          <button class="addbutton">+</button>
      </div>`);
    console.log(newItem);
  });
});

const theme = document.getElementById("theme");
const Input_item = document.getElementById("addItem");
const List_of_Items = document.querySelector(".content ul");
const itemsLeft = document.querySelector(".items-left span");

itemsLeft.innerText = document.querySelectorAll(
  '.list-item input[type="checkbox"]'
).length;

theme.addEventListener("click", function () {
  document.querySelector("body").classList = [
    theme.checked ? "lightTheme" : "darkTheme",
  ];
});

document.querySelector(".add_item span").addEventListener("click", function () {
  if (Input_item.value.length > 0) {
    createNewTodoItem(Input_item.value);
    Input_item.value = "";
  }
});

Input_item.addEventListener("keypress", function (event) {
  if (event.charCode === 13 && Input_item.value.length > 0) {
    createNewTodoItem(Input_item.value);
    Input_item.value = "";
  }
});

function createNewTodoItem(text) {
  const el = document.createElement("li");
  el.classList.add("rows");

  el.innerHTML = `
        <label class="list-item">
            <input type="checkbox" name="todoItem">
            <span class="checkmark"></span>
            <span class="text">${text}</span>
        </label>
        <span class="remove"></span>
    `;

  if (
    document.querySelector('.change input[type="radio"]:checked').id ===
    "completed"
  ) {
    el.classList.add("hidden");
  }
  List_of_Items.append(el);
  updateItemsCount(1);
}

function updateItemsCount(number) {
  itemsLeft.innerText = +itemsLeft.innerText + number;
}

function removeTodoItem(el) {
  el.remove();
  updateItemsCount(-1);
}

List_of_Items.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
    removeTodoItem(event.target.parentElement);
  }
});

document.querySelector(".clear").addEventListener("click", function (event) {
  document
    .querySelectorAll('.list-item input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTodoItem(item.closest("li"));
    });
});

document.querySelectorAll(".change input").forEach((radio) => {
  radio.addEventListener("change", function (event) {
    changeTodoItems(event.target.id);
  });
});

function changeTodoItems(id) {
  const allItems = List_of_Items.querySelectorAll("li");

  switch (id) {
    case "all":
      allItems.forEach(function (item) {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach(function (item) {
        item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
    default:
      allItems.forEach(function (item){
        !item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
  }
}

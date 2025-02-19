"use strict";

//Functions
function isInputValid(...args) {
  for (let i = 0; i < args.length; i++) {
    if (!args[i].checkValidity()) {
      return false;
    }
  }
  return true;
}

// Buttons
const btnSend = document.getElementById("-btn__send");
const btnClearAll = document.getElementById("-btn__clear");

// DOM
const treasureList = document.getElementById("-treasure-list");
treasureList.innerHTML = localStorage.getItem("key");

const allTreasures = document.getElementsByClassName("treasure");
const allBtnsDeleteElement = document.getElementsByClassName(
  "btn__delete-element"
);

const errorMessage = document.getElementById("error-message");
// Input
const inputName = document.getElementById("-name-input");
const inputCost = document.getElementById("-cost-input");
const inputLocation = document.getElementById("-location-input");

// Code
/*
<div class="treasure">
  <div class="treasure__wrap-info">
    <div class="treasure__info"></div>
    <div class="treasure__info"></div>
    <div class="treasure__info"></div>
  </div>
  <div class="btn__delete-element">X</div>
</div>
*/

btnSend.addEventListener("click", () => {
  // Creating Elements

  if (!isInputValid(inputName, inputCost, inputLocation)) {
    errorMessage.textContent = "The entered data is incorrect";
    return;
  } else {
    errorMessage.textContent = "";
  }

  const newTreasure = document.createElement("div");
  newTreasure.classList.add("treasure");

  const newTreasureWrapInfo = document.createElement("div");
  newTreasureWrapInfo.classList.add("treasure__wrap-info");

  const fragmentNewTreasureInfo = new DocumentFragment();
  for (let i = 0; i < 3; i++) {
    const newTreasureInfo = document.createElement("div");
    newTreasureInfo.classList.add("treasure__info");

    newTreasureInfo.textContent =
      i === 0
        ? `name: ${inputName.value}`
        : i === 1
        ? `cost: ${inputCost.value}$`
        : i === 2
        ? `location: ${inputLocation.value}`
        : "";

    fragmentNewTreasureInfo.append(newTreasureInfo);
  }

  const btnDeleteElement = document.createElement("div");
  btnDeleteElement.classList.add("btn__delete-element");
  btnDeleteElement.textContent = "X";

  btnDeleteElement.addEventListener("click", (event) => {
    const closestElement = event.target.closest(".treasure");
    closestElement.remove();
  });

  // Appending Elements
  treasureList.appendChild(newTreasure);

  newTreasure.append(newTreasureWrapInfo, btnDeleteElement);
  newTreasureWrapInfo.append(fragmentNewTreasureInfo);

  localStorage.setItem("key", treasureList.innerHTML);

  inputName.value = "";
  inputCost.value = "";
  inputLocation.value = "";
});

btnClearAll.addEventListener("click", () => {
  treasureList.replaceChildren();
  localStorage.setItem("key", treasureList.innerHTML);
});

for (let i = 0; i < allTreasures.length; i++) {
  allBtnsDeleteElement[i].addEventListener("click", (event) => {
    const closestElement = event.target.closest(".treasure");
    closestElement.remove();
    localStorage.setItem("key", treasureList.innerHTML);
  });
}


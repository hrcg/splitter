const bill = document.getElementById("input-bill");
const tipBtns = document.querySelectorAll(".tip");
const customTip = document.getElementById("input-tip");
const numberofPeople = document.getElementById("input-people");
const result = document.querySelectorAll(".value");
const resetValuesButton = document.querySelector(".reset");

bill.addEventListener("input", setBIllValue);
tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
customTip.addEventListener("input", setCustomTipValue);
numberofPeople.addEventListener("input", setPeopleValue);
resetValuesButton.addEventListener("click", resetValues);

let billValue = 0; // Default Value for the Bill
let tipValue = 0.15; // Default Value for the Tip
let peopleValue = 1; // Default Value for the number of People

// Input validations, disallows any input type but that of numbers
function validateInput(s) {
  var regex = /^[0-9]*\.?[0-9]*$/;
  return s.match(regex);
}

// Resets the values to the default ones if the reset button is pressed
function resetValues() {
  bill.value = "0";
  setBIllValue();

  tipBtns[2].click();

  numberofPeople.value = "1";
  setPeopleValue();
}

function setBIllValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!validateInput(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);
  calculateTip();
}

function handleClick(event) {
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
      console.log(tipValue);
    }
  });

  customTip.value = "";
  calculateTip();
}

function setCustomTipValue() {
  if (customTip.value.includes(",")) {
    customTip.value = customTip.value.replace(",", ".");
  }
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (!validateInput(customTip.value)) {
    customTip.value = customTip.value.substring(0, customTip.value.length - 1);
  }

  tipValue = parseFloat(customTip.value / 100);

  if (customTip.value !== "") {
    calculateTip();
  }
}

function setPeopleValue() {
  if (!validateInput(numberofPeople.value)) {
    numberofPeople.value = numberofPeople.value.substring(
      0,
      numberofPeople.value.length - 1
    );
  }
  peopleValue = parseFloat(numberofPeople.value);
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (tipValue + 1)) / peopleValue;
    result[0].innerHTML = "$" + tipAmount.toFixed(2);
    result[1].innerHTML = "$" + total.toFixed(2);
  }
}

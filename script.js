const enterBudgetInput = document.getElementById("enterBudget");
const setBudgetButton = document.getElementById("setBudget");
const mainDiv = document.querySelector(".main");
const addExpenseButton = document.getElementById("addButtons");
const deleteButtons = document.getElementsByClassName("blue-button");
const form2 = document.getElementById("form2");
const dateSpan = document.getElementById("date");
const nameSpan = document.getElementById("name");
const priceDiv = document.getElementById("price");
const totalBudgetSpan = document.querySelector(
  ".totalBudget:nth-child(1) .two"
);
const expensesSpan = document.querySelector(".totalBudget:nth-child(2) .two");
const balanceSpan = document.querySelector(".totalBudget:nth-child(3) .two");

const expenses = [];

mainDiv.style.display = "none";

setBudgetButton.addEventListener("click", function (e) {
  e.preventDefault();
  const budget = enterBudgetInput.value;
  totalBudgetSpan.textContent = budget;
  enterBudgetInput.value = "";
});

addExpenseButton.addEventListener("click", function (e) {
  e.preventDefault();

  const dueDate = document.getElementById("dDate").value;
  const totalAmount = document.getElementById("totalAmount").value;
  const categoryUnCapitalized = document.getElementById("category");
  const category = capitalizeFirstLetter(categoryUnCapitalized.value);
  
  if (isNaN(totalAmount)) {
    alert("Please enter numbers only for the total amount.");
    return;
  }

  if (!dueDate || !totalAmount || !category) {
    alert("Please enter all inputs");
    return;
  }
  

  const expense = {
    dueDate: dueDate,
    totalAmount: totalAmount,
    category: category,
  };

  expenses.push(expense);

  const expenseDiv = document.createElement("div");
  expenseDiv.classList.add("main2");

  const nameDateDiv = document.createElement("div");
  nameDateDiv.id = "name-date";

  const nameSpanClone = nameSpan.cloneNode(true);
  nameSpanClone.textContent = expense.category;

  const dateSpanClone = dateSpan.cloneNode(true);
  dateSpanClone.textContent = expense.dueDate;

  nameDateDiv.appendChild(nameSpanClone);
  nameDateDiv.appendChild(dateSpanClone);

  expenseDiv.appendChild(nameDateDiv);

  const priceDivClone = priceDiv.cloneNode(true);
  priceDivClone.textContent = expense.totalAmount;

  expenseDiv.appendChild(priceDivClone);

  const deleteButton = document.createElement("button");
  deleteButton.className = "blue-button";
  deleteButton.type = "submit";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    const index = expenses.indexOf(expense);
    if (index > -1) {
      expenses.splice(index, 1);
    }

    expenseDiv.remove();

    updateTotals();

    if (expenses.length === 0) {
      mainDiv.style.display = "none";
    }

  });
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  expenseDiv.appendChild(deleteButton);
  mainDiv.appendChild(expenseDiv);

  updateTotals();

  if (expenses.length > 0) {
    mainDiv.style.display = "block";
  }

  form2.reset();
});

function updateTotals() {
  let totalExpenses = 0;
  expenses.forEach(function (expense) {
    totalExpenses += Number(expense.totalAmount);
  });

  expensesSpan.textContent = totalExpenses;
  balanceSpan.textContent = totalBudgetSpan.textContent - totalExpenses;

  if (expenses.length === 0) {
    mainDiv.style.display = "none";
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const amountInput = document.getElementById("amount-input"); // access input element for the amount to be logged
const typeInput = document.getElementById("type"); // access the select element for the type of input
const historyListDisplay = document.getElementById("history-list"); // access the ul element where the inputs will be added
const addButton = document.getElementById("add-btn"); // access the submit button for the form
const balanceEl = document.getElementById("total-balance"); // access the element that displays the total amount
const wellbeingEl = document.getElementById("afford"); // access the element that displays what the balance can afford
const deleteButton = document.querySelectorAll("delete-button"); // access the delete button for removing an element in the list
const latestExpenseEl = document.getElementById("latest-expense"); // access the element that displays the latest amount spent
const latestIncomeEl = document.getElementById("latest-income"); //access the element that displayst the lastest amount earned

const historyArray = []; // initializes the array where the inputs will be pushed

addButton.addEventListener("click", logHistory); // event listener for the submit button that executes the function to log the input to the list
historyListDisplay.addEventListener("click", deleteLog); // event listener for the delete that executes the function to delete selected element

function logType() {
  // if the element is an expense the amount input shall be negative
  if (typeInput.value === "expense") {
    amountInput.value = -amountInput.value; // returns negative amount with unary - operator
  }
  // else the amount input must be positive
  else {
    amountInput.value = +amountInput.value; // returns positive amount with unary + operator
  }
}

function logHistory(event) {
  event.preventDefault(); // prevents the default behavior of refreshing the page when the submit button gets clicked
  logType(); // calls the function to determin whether the amount value will be positive or negative
  const log = { amount: Number(amountInput.value), type: typeInput.value }; //initialize an object that takes the amount input and type input as values
  historyArray.unshift(log); // adds the most recent input to the start of the array;
  displayHistoryLog(); // calls a function to display the updated array
  totalBalance();
  updateLatest();
}

function deleteLog(event) {
  // event.target returns the element that triggered the event in this instance the specific delete button in the list
  const logToBeRemoved = event.target.getAttribute("data-index"); // getAttribute returns the index of the element that triggered the event stored in the data-index attribute
  historyArray.splice(logToBeRemoved, 1); //splice removes an element starting from the index of the triggered element by 1 element
  displayHistoryLog();
  totalBalance();
  updateLatest();
}

function displayHistoryLog() {
  amountInput.value = ""; //refreshes the input element so it becomes blank after submitting
  //refreshes the ul element so inputs would not be duplicated
  historyListDisplay.innerHTML = "";
  //loops through the elements inside the array
  for (let log of historyArray) {
    // determines the type of the input
    if (log.type === "expense") {
      //adds a li element to the ul element to display the elements in the array;
      historyListDisplay.innerHTML += `<li class="history-log "><div> 
      <span class="amount expense">${Math.abs(log.amount)}</span>
      </div> 
      <div>
      <span class="type">Expense</span>
      <span class="delete-btn" data-index="${historyArray.indexOf(log)}">delete</span>
      </div></li>`; //displays absolute unit for the amount so the "-" would not be visible;
      // the delete button has a "data-" attribute which stores the index of the element in the array
    } else {
      // returns the income counterpart of the list element
      historyListDisplay.innerHTML += `<li class="history-log "><div> 
      <span class="amount income">${Math.abs(log.amount)}</span>
      </div> 
      <div>
      <span class="type">Income</span>
      <span class="delete-btn" data-index="${historyArray.indexOf(log)}">delete</span>
      </div></li>`;
    }
  }
}

function updateLatest() {
  //find loops through the array and returns the first occurence of a specified value
  const latestExpense = historyArray.find((log) => log.type === "expense"); // takes a call back function as an argument in this instance, log is the current object in the array its checking and it is trying to find the first occurence of log.type = "expense"
  if (latestExpense !== undefined) {
    // if the type is found, update the latest expense element to the amount value
    latestExpenseEl.textContent = latestExpense.amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    latestExpenseEl.textContent = "$0";
  }
  const latestIncome = historyArray.find((log) => log.type === "income");
  if (latestIncome !== undefined) {
    latestIncomeEl.textContent = latestIncome.amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    latestIncomeEl.textContent = "$0";
  }
}
function totalBalance() {
  let balance = 0; // initialize the balance to zero
  for (let log of historyArray) {
    //loop through the elements stored in the array
    balance += log.amount; //add every value of the amount logged in the array
  }
  // updates the text content of the balance to the sum of the logged amount in $ format
  balanceEl.textContent = balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  wellbeingUpdate(balance);
}

function wellbeingUpdate(balance) {
  switch (true) {
    case balance < 4:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">💀</span>This is a cry for help!</h2>';
      break;
    case balance >= 5 && balance < 20:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">🥧</span>You can get a PIE!</h2>';
      break;
    case balance >= 20 && balance < 50:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">🍚</span>A RICE BOWL sounds nice!</h2>';
      break;
    case balance >= 50 && balance < 100:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">👕</span>I think I need a NEW SHIRT</h2>';
      break;
    case balance >= 100 && balance < 200:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">🛒</span>Gotta get GROCERIES!</h2>';
      break;
    case balance >= 200 && balance < 500:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">👞</span>NEW SHOES?</h2>';
      break;
    case balance >= 500 && balance < 1000:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">🏠</span>Have you paid your RENT yet?</h2>';
      break;
    case balance >= 1000:
      wellbeingEl.innerHTML =
        '<h2 id="afford"><span id="emoji">💰</span>I think I\'m rich</h2>';
      break;
  }
}

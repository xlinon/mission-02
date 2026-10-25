const amountInput = document.getElementById("amount-input");
const typeInput = document.getElementById("type");
const historyListDisplay = document.getElementById("history-list");
const addButton = document.getElementById("add-btn");
const balanceEl = document.getElementById("total-balance");
const wellbeingEl = document.getElementById("afford");
const deleteButton = document.querySelectorAll("delete-button");
const historyList = [];

addButton.addEventListener("click", logHistory);

function logType() {
  if (typeInput.value === "expense") {
    amountInput.value = -amountInput.value;
  } else {
    amountInput.value = +amountInput.value;
  }
}

function logHistory(event) {
  event.preventDefault();
  logType();
  const historyLog = {
    amount: parseInt(amountInput.value),
    type: typeInput.value,
  };
  historyList.unshift(historyLog);
  displayHistoryLog();
  totalBalance();
}

function displayHistoryLog() {
  amountInput.value = "";
  historyListDisplay.innerHTML = "";
  for (let logs of historyList) {
    if (logs.type === "expense") {
      historyListDisplay.innerHTML += `<li class="history-log "><div><span class="amount expense">${Math.abs(logs.amount)}</span></div> 
      <div><span class="type">Expense</span>
      <span class="delete-btn" data-index="${historyList.indexOf(logs)}" style="cursor: pointer">delete</span>
      </div></li>`;
    } else {
      historyListDisplay.innerHTML += `<li class="history-log "><div><span class="amount income">${Math.abs(logs.amount)}</span></div> 
      <div>
        <span class="type">Income</span>
        <span class="delete-btn" data-index="${historyList.indexOf(logs)}" style="cursor: pointer">delete</span>
      </div></li>`;
    }
  }
}

historyListDisplay.addEventListener("click", deleteLog);

function deleteLog(event) {
  // ================review this block ====================
  if (event.target.classList.contains("delete-btn")) {
    const itemToDelete = parseInt(event.target.getAttribute("data-index"));
    historyList.splice(itemToDelete, 1);
    console.log(historyList);
    displayHistoryLog();
  }
}

function totalBalance() {
  let balance = 0;
  for (let log of historyList) {
    balance += log.amount;
  }
  balanceEl.textContent = balance;
  wellbeingUpdate(
    balance.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  );
}

function wellbeingUpdate(balance) {
  switch (true) {
    case balance < 5:
      wellbeingEl.textContent = "This is a cry for help!";
      break;
    case balance > 5 && balance < 20:
      wellbeingEl.textContent = "You can get a PIE!";
      break;
    case balance > 20 && balance < 50:
      wellbeingEl.textContent = "A RICE BOWLsounds nice!";
      break;
    case balance > 50 && balance < 100:
      wellbeingEl.textContent = "I think I need a NEW SHIRT";
      break;
    case balance > 100 && balance < 200:
      wellbeingEl.textContent = "Gotta get GROCERIES!";
      break;
    case balance > 200 && balance < 500:
      wellbeingEl.textContent = "NEW SHOES?";
      break;
    case balance > 500 && balance < 1000:
      wellbeingEl.textContent = "Have you paid your RENT yet?";
      break;
    case balance > 1000:
      wellbeingEl.textContent = "I think I'm rich";
      break;
  }
}

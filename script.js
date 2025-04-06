const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const transactionList = document.getElementById('transaction-list');

let transactions = [];

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
}

incomeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = document.getElementById('income-text').value;
  const amount = parseFloat(document.getElementById('income-amount').value);
  addTransaction({ id: Date.now(), text, amount });
  incomeForm.reset();
  showTab('history');
});

expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = document.getElementById('expense-text').value;
  const amount = -Math.abs(parseFloat(document.getElementById('expense-amount').value));
  addTransaction({ id: Date.now(), text, amount });
  expenseForm.reset();
  showTab('history');
});

function addTransaction(tx) {
  transactions.push(tx);
  renderTransactions();
}

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  renderTransactions();
}

function renderTransactions() {
  transactionList.innerHTML = `
    <li class="header">
      <span>Date</span>
      <span>Type</span>
      <span>Description</span>
      <span class="amount">Amount</span>
      <span>Action</span>
    </li>
  `;

  transactions.slice().reverse().forEach(tx => {
    const type = tx.amount < 0 ? 'Expense' : 'Income';
    const date = new Date(tx.id).toLocaleDateString();
    const sign = tx.amount < 0 ? '-' : '+';
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${date}</span>
      <span>${type}</span>
      <span>${tx.text}</span>
      <span class="amount">${sign}$${Math.abs(tx.amount)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${tx.id})">Delete</button>
    `;
    transactionList.appendChild(li);
  });
}

showTab('income');

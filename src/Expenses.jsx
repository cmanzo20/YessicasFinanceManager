import { useState } from "react";
import ExpensesForm from "./ExpensesForm";
import { periodInDaysMap, daysToString } from "./utils/helperFunctions";

function Expenses({ expenses, setExpenses, loading, error }) {
  const [viewPeriod, setViewPeriod] = useState("monthly");

  function handleAddExpense(newExpense) {
    const id = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    const expenseWithId = { ...newExpense, id };
    setExpenses(prev => [...prev, expenseWithId]);
    // TODO: Post to backend
  }

  function handleDeleteExpense(id) {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmed) return;
    setExpenses(prev => prev.filter(item => item.id !== id));
    // TODO: Delete from backend
  }

  return (
    <div className="expenses">
      <h3 className="expenses-title">Expenses</h3>
      <p className="expenses-description">Here, you can see and manage your expenses</p>
      <h4>
        <select
          id="periodSelect"
          value={viewPeriod}
          onChange={(e) => setViewPeriod(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select> Expenses: $
        {expenses ? expenses.reduce((sum, item) => sum + (item.cost / item.frequency) * periodInDaysMap[viewPeriod], 0).toFixed(2) : "0.00"}
      </h4>

      {loading && <p>Loading...</p>}
      {error && console.error(`Error: ${error}`)}

      {!loading && (
        <ul className="expenses-List">
          {expenses.map(item => (
            <li key={item.id}>
              {item.source}: ${item.cost} {daysToString(item.frequency)}
              <button onClick={() => handleDeleteExpense(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <ExpensesForm onAddExpense={handleAddExpense} />
    </div>
  );
}

export default Expenses;

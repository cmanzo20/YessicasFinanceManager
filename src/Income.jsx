import { useState } from "react";
import { daysToString, periodInDaysMap } from "./utils/helperFunctions.js";
import IncomeForm from "./IncomeForm";

function Income({ income, setIncome, loading, error }) {
  const [viewPeriod, setViewPeriod] = useState("monthly");

  function handleAddIncome(newIncome) {
    const id = income.length > 0 ? Math.max(...income.map(i => i.id)) + 1 : 1;
    const incomeWithId = { ...newIncome, id };
    setIncome((prev) => [...prev, incomeWithId]);
    // TODO: POST to backend
  }

  function handleDeleteIncome(id) {
    const confirmed = window.confirm("Are you sure you want to delete this income item?");
    if (!confirmed) return;
    setIncome((prev) => prev.filter(item => item.id !== id));
    // TODO: DELETE from backend
  }

  return (
    <div className="income">
      <h3 className="income-title">Income</h3>
      <p className="income-description">Here, you can see and manage how much money you are currently making</p>
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
        </select> Income: ${(income.reduce((sum, item) => sum + (item.amount / item.frequency) * periodInDaysMap[viewPeriod], 0)).toFixed(2)}
      </h4>

      {loading && <p>Loading...</p>}
      {error && console.log(`Error: ${error}`)}

      {!loading && (
        <ul>
          {income.map((item) => (
            <li key={item.id}>
              {item.source}: ${item.amount} {daysToString(item.frequency)}
              <button onClick={() => handleDeleteIncome(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <IncomeForm onAddIncome={handleAddIncome} />
    </div>
  );
}

export default Income;

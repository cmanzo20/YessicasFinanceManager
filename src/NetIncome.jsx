import { useState } from "react";
import { periodInDaysMap, periodtoUnitMap} from "./utils/helperFunctions";

function NetIncome({ income, expenses }) {
  const [viewPeriod, setViewPeriod] = useState("monthly");
  const incomeTotal = income.reduce((sum, item) => sum + (item.amount / item.frequency) * periodInDaysMap[viewPeriod], 0);
  const expensesTotal = expenses.reduce((sum, item) => sum + (item.cost / item.frequency) * periodInDaysMap[viewPeriod], 0);
  const netIncome = incomeTotal - expensesTotal;

  return (
    <div className="netIncome">
      <h3 className="netIncome-title">Net Income</h3>
      <p className="netIncome-description">
        Here, you can see your income left after your expenses</p>
      <h4>Based on your <select
        id="periodSelect"
        value={viewPeriod}
        onChange={(e) => setViewPeriod(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select> data:
      </h4>
      <h4 className="netIncome-Summary">
        Income: ${incomeTotal.toFixed(2)} <br />
        Expenses: ${expensesTotal.toFixed(2)} <br />
        <strong>Net Income: ${netIncome.toFixed(2)}</strong>
      </h4>
      <p className="netIncome-advice">
        Although your net income is the money left after expenses, it is HIGHLY recommended that you spend this money wisely.
        It is a good idea to follow the 50/30/20 rule: allocate 50% to needs, 30% to wants, and 20% to paying off debts/saving.
      </p>
      <h4>Following this guide line, you should aim to do the following: </h4>
      <ul className="netIncome-List">
        <li>Spend no more than ${(incomeTotal * 0.5).toFixed(2)} on needs each {periodtoUnitMap[viewPeriod]}.</li>
        <li>Allocate ${(incomeTotal * 0.3).toFixed(2)} for wants each {periodtoUnitMap[viewPeriod]}.</li>
        <li>Pay off Debts/Save ${(incomeTotal * 0.2).toFixed(2)} each {periodtoUnitMap[viewPeriod]}.</li>
      </ul>
      <h4>Based on your current finances, you should do the following: </h4>
      <ul className="netIncome-List">
        <li>Allocate ${expensesTotal.toFixed(2)} for expenses each {periodtoUnitMap[viewPeriod]}.</li>
        <li>Allocate ${(netIncome * 0.6).toFixed(2)} for wants each {periodtoUnitMap[viewPeriod]}.</li>
        <li>Pay off Debts/Save ${(netIncome * 0.4).toFixed(2)} each {periodtoUnitMap[viewPeriod]}.</li>
      </ul>
    </div>
  );
}

export default NetIncome;

import { useEffect, useState } from "react";
import Income from "./Income";
import Expenses from "./Expenses";
import NetIncome from "./NetIncome";

function Dashboard() {
  const [income, setIncome] = useState([{ id: 1, source: "Job", amount: 480, frequency: 7 }]);
  const [expenses, setExpenses] = useState([{ id: 1, source: "Gas", cost: 40, frequency: 7 }, { id: 2, source: "Car Payment", cost: 550, frequency: 28 }, {id: 3, source: "Tuition Payment", cost: 500, frequency: 28}, {id: 4, source: "Credit Cards", cost: 50, frequency: 28}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch income and expenses on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          fetch(`${process.env.BACKEND_URL}/income`),
          fetch(`${process.env.BACKEND_URL}/expenses`),
        ]);

        if (!incomeRes.ok || !expensesRes.ok) {
          throw new Error("Error fetching data");
        }

        const [incomeData, expensesData] = await Promise.all([
          incomeRes.json(),
          expensesRes.json(),
        ]);

        setIncome(incomeData);
        setExpenses(expensesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h3 className="dashboard-welcome">Welcome to Your Dashboard!</h3>
      <p className="dashboard-description">Here, you can manage your finances effectively.</p>
      <div className="dashboard-grid">
        <Income
          income={income}
          setIncome={setIncome}
          loading={loading}
          error={error}
        />
        <Expenses
          expenses={expenses}
          setExpenses={setExpenses}
          loading={loading}
          error={error}
        />
        <NetIncome
          income={income}
          expenses={expenses}
        />
      </div>
    </div>
  );
}

export default Dashboard;

import { useState, useEffect } from "react";

function Income() {
  const [incomeList, setIncomeList] = useState([{ id: 1, source: "Job", amount: 500 }, { id: 2, source: "Boyfriend", amount: 20 }]); //test data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncome = async() => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/income`);
        if (!response.ok) {
          throw new Error("Error fetching income data");
        }
        const data = await response.json();
        setIncomeList(data);
      }
      catch (err) {
        setError(err.message);  //change to null for test data
      }
      finally {
        setLoading(false);
      }
    };
    
    fetchIncome();
  }, []);

  return (
    <div className="income">
      <h3 className="income-title">Income</h3>
      <p className="income-description">Here, you can see and manage how much money you are currently making</p>
      <h4>Montly Income: ${incomeList.reduce((sum, item) => sum + item.amount*4, 0)}</h4> {/* calculates monthly income */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "black" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {incomeList.map((item) => (
            <li key={item.id}>
              {item.source}: ${item.amount}
            </li>
          ))}
        </ul>
      )}
      <label htmlFor="weeklyIncome">How much do you earn in a week? $</label>
        <input
          id="weeklyIncome"
          type="number"
          placeholder="Enter your weekly income"
        />
    </div>
  );
}

export default Income;

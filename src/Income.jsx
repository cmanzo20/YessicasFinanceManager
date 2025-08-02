import IncomeForm from "./IncomeForm";
import { useState, useEffect } from "react";

function Income() {
  const [incomeList, setIncomeList] = useState([{ id: 1, source: "Job", amount: 500 }, { id: 2, source: "Boyfriend", amount: 20 }]); //test data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/income`);
        if (!response.ok) {
          throw new Error("Error fetching income data");
        }
        const data = await response.json();
        setIncomeList(data);
      }
      catch (err) {
        setError(err.message);
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
      <h4>Montly Income: ${incomeList.reduce((sum, item) => sum + item.amount * 4, 0)}</h4> {/* calculates monthly income */}
      {loading && <p>Loading...</p>}
      {/* {error && <p style={{ color: "black" }}>Error: {error}</p>} CAN DO THIS, I prefer console.log*/}
      {error && console.log(`Error: ${error}`)}

      {!loading && (  //remove "&& !error" for testing purposes
        <ul>
          {incomeList.map((item) => (
            <li key={item.id}>
              {item.source}: ${item.amount}
              <button onClick={() => handleDeleteIncome(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <IncomeForm onAddIncome={handleAddIncome} />
    </div>
  );

  function handleAddIncome(newIncome) {
    // Give the new income a unique ID
    const id = incomeList.length > 0 ? Math.max(...incomeList.map(i => i.id)) + 1 : 1;
    const incomeWithId = { ...newIncome, id };
    setIncomeList((prev) => [...prev, incomeWithId]);
    // Send the new income to the backend later
  };

  function handleDeleteIncome(id) {
    const confirmed = window.confirm("Are you sure you want to delete this income item?");
    if (!confirmed) return;
    setIncomeList((prev) => prev.filter(item => item.id !== id));
  }

}

export default Income;

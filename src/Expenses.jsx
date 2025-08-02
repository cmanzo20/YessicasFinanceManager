import { useEffect, useState } from "react";

function Expenses() {
  const [expenses, setExpenses] =  useState([{id: 1, source: "gas", cost: "1000"}])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try{
        const response = await fetch(`${process.env.BACKEND_URL}/expenses`);
        if (!response.ok){
          throw new Error("Error fetching Expenses");
        }
        const data = await response.json();
        setExpenses(data);
      }
      catch (err){
        setError(err.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchExpenses();
  }, []);

  return (
    <div className="expenses">
      <h3 className="expenses-title">Expenses</h3>
      <p className="expenses-description">Here, you can see and manage your expenses</p>
      <h4>Monthly Expenses: ${}</h4>
    </div>
  );
}

export default Expenses;

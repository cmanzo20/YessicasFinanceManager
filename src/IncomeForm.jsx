import { useState } from "react";


function IncomeForm({ onAddIncome }) {

    return (
        <>
            <form className="income-form" onSubmit={handleSubmit}>
                <label htmlFor="incomeSource">What is your source of income?</label>
                <input
                    id="incomeSource"
                    type="text"
                    placeholder="Enter your source of income"
                />
                <label htmlFor="weeklyIncome">How much do you earn in a week from this?</label>
                <input
                    id="weeklyIncome"
                    type="float"
                    placeholder="Enter your weekly income"
                />
                <button type="submit">Add Income</button>
            </form>
        </>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const incomeSource = event.target.incomeSource.value;
        const weeklyIncome = parseFloat(event.target.weeklyIncome.value) || 0;

        if (!incomeSource || !weeklyIncome || isNaN(weeklyIncome)) {
            alert("Please fill out all fields correctly.");
            return;
        }
        const newIncome = {
            source: incomeSource,
            amount: weeklyIncome,
        };
        event.target.incomeSource.value = "";
        event.target.weeklyIncome.value = "";
        onAddIncome(newIncome);
    };
}
export default IncomeForm;
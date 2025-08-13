function ExpenseForm({ onAddExpense }) {
    return (
        <>
            <form className="expense-form" onSubmit={handleSubmit}>
                <label htmlFor="expenseSource">What do you spend money on?</label>
                <input
                    id="expenseSource"
                    type="text"
                    placeholder="Enter your expense name"
                />

                <label htmlFor="expenseFrequency">How often do you spend on this expense?</label>
                <span id="frequencyAndUnits">
                    Every
                    <input
                        id="expenseFrequency"
                        type="number"
                        placeholder="Frequency"
                    />
                    <select id="expenseUnits">
                        <option value="1">day(s)</option>
                        <option value="7">week(s)</option>
                        <option value="28">month(s)</option>
                        <option value="365">year(s)</option>
                    </select>
                </span>

                <label htmlFor="expenseCost">How much does it cost?</label>
                <input
                    id="expenseCost"
                    type="number"
                    placeholder="Enter the cost"
                />

                <button type="submit">Add Expense</button>
            </form>
        </>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const expenseSource = event.target.expenseSource.value.trim();
        const expenseCost = parseFloat(event.target.expenseCost.value);
        const expenseFrequency = parseInt(event.target.expenseFrequency.value);
        const expenseUnits = parseInt(event.target.expenseUnits.value);
        if (
            !expenseSource ||
            isNaN(expenseCost) || expenseCost <= 0 ||
            isNaN(expenseFrequency) || expenseFrequency <= 0 ||
            isNaN(expenseUnits) || expenseUnits <= 0
        ) {
            alert("Please fill out all fields with valid data.");
            return;
        }

        const newExpense = {
            source: expenseSource,
            cost: expenseCost,
            frequency: expenseFrequency * expenseUnits
        };
        event.target.expenseSource.value = "";
        event.target.expenseCost.value = "";
        event.target.expenseFrequency.value = "";

        onAddExpense(newExpense);
    }
}

export default ExpenseForm;

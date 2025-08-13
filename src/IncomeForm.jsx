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
                <label htmlFor="incomeFrequency">How often are you paid from this source of income?</label>
                <span id="frequencyAndUnits">
                    Every
                    <input
                        id="incomeFrequency"
                        type="number"
                        placeholder="Frequency"
                    />
                    <select id="incomeUnits">
                        <option value="1">day(s)</option>
                        <option value="7">week(s)</option>
                        <option value="28">month(s)</option>
                        <option value="365">year(s)</option>
                    </select>
            </span>
            <label htmlFor="incomeAmount">How much does this source pay you?</label>
            <input
                id="incomeAmount"
                type="float"
                placeholder="Enter your income amount"
            />
            <button type="submit">Add Income</button>
        </form >
        </>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const incomeSource = event.target.incomeSource.value.trim();
        const incomeAmount = parseFloat(event.target.incomeAmount.value);
        const incomeUnits = parseInt(event.target.incomeUnits.value);
        const incomeFrequency = parseInt(event.target.incomeFrequency.value);

        if (!incomeSource || !incomeAmount || isNaN(incomeAmount) || incomeAmount <= 0 || !incomeUnits || isNaN(incomeUnits) || !incomeFrequency || isNaN(incomeFrequency) || incomeFrequency <= 0) {
            alert("Please fill out all fields with valid data.");
            return;
        }
        const newIncome = {
            source: incomeSource,
            amount: incomeAmount,
            frequency: incomeFrequency * incomeUnits
        };
        event.target.incomeSource.value = "";
        event.target.incomeAmount.value = "";
        event.target.incomeFrequency.value = "";
        onAddIncome(newIncome);
    };
}
export default IncomeForm;
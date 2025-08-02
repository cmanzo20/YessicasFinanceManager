import { stringToDays } from "./utils/helperFunctions.js";

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
                <span>
                    Every
                    <input
                        id="incomeFrequency"
                        type="number"
                        placeholder="Enter payment frequency"
                    />
                    <input id = "incomeUnits" list="frequencyUnits"></input>
                    <datalist id="frequencyUnits">
                        <option value="day(s)"></option>
                        <option value="week(s)"></option>
                        <option value="month(s)"></option>
                        <option value="year(s)"></option>
                    </datalist>
                </span>
                <label htmlFor="incomeAmount">How much does this source pay you?</label>
                <input
                    id="incomeAmount"
                    type="float"
                    placeholder="Enter your income amount"
                />
                <button type="submit">Add Income</button>
            </form>
        </>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const incomeSource = event.target.incomeSource.value;
        const incomeAmount = parseFloat(event.target.incomeAmount.value);
        const incomeUnits = stringToDays(event.target.incomeUnits.value);
        const incomeFrequency = parseInt(event.target.incomeFrequency.value);

        if (!incomeSource || !incomeAmount || isNaN(incomeAmount) || incomeAmount <= 0 || !incomeUnits || isNaN(incomeUnits) ||!incomeFrequency || isNaN(incomeFrequency) || incomeFrequency <= 0) {
            alert("Please fill out all fields with valid data.");
            return;
        }
        const newIncome = {
            source: incomeSource,
            amount: incomeAmount,
            frequency: incomeFrequency*incomeUnits
        };
        event.target.incomeSource.value = "";
        event.target.incomeAmount.value = "";
        event.target.incomeFrequency.value = "";
        onAddIncome(newIncome);
    };
}
export default IncomeForm;
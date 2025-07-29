import Income from "./Income";
import Expenses from "./Expenses";
import Savings from "./Savings";

function DashBoard() {
  return (
    <div className="dashboard">
      <h3 className="dashboard-welcome">Welcome to Your Dashboard!</h3>
      <p className="dashboard-description">Here, you can manage your finances effectively.</p>
      <div className="dashboard-grid">
        <Income />
        <Expenses />
        <Savings />
      </div>
    </div>
  );
}

export default DashBoard;
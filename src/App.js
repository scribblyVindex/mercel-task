import logo from "./logo.svg";
import "./App.css";
import EngagementMessagesOverTime from "./components/EngagementMessagesOverTime";

function App() {
  return (
    <div className="App">
      <div className="ChartContainer">
        <EngagementMessagesOverTime />
      </div>
    </div>
  );
}

export default App;

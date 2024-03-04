import { useState } from "react";
import Timer from "./Timer";
import Stopwatch from "./StopWatch";

function App() {
  const [timerVisible, setTimerVisible] = useState(true);
  const [stopwatchVisible, setStopwatchVisible] = useState(false);

  const showTimer = () => {
    setTimerVisible(true);
    setStopwatchVisible(false);
  };

  const showStopwatch = () => {
    setTimerVisible(false);
    setStopwatchVisible(true);
  };

  return (
    <div
      className="App"
      style={{
        border: "8px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        className="toggle-buttons"
        style={{ borderBottom: "2px solid #ccc", marginBottom: "40px" }}
      >
        <button
          className={timerVisible ? "active" : ""}
          onClick={showTimer}
          style={{ padding: "10px 20px", marginBottom: "10px" }}
        >
          Timer
        </button>
        <button
          className={stopwatchVisible ? "active" : ""}
          onClick={showStopwatch}
          style={{ padding: "10px 20px", marginBottom: "10px" }}
        >
          StopWatch
        </button>
      </div>
      <div
        className={`timer ${timerVisible ? "visible" : "hidden"}`}
        style={{ display: timerVisible ? "block" : "none" }}
      >
        <Timer style={{ width: "100%", height: "100%" }} />
      </div>
      <div
        className={`stopwatch ${stopwatchVisible ? "visible" : "hidden"}`}
        style={{ display: stopwatchVisible ? "block" : "none" }}
      >
        <Stopwatch style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

export default App;

/* eslint-disable react/prop-types */
import { useState } from "react";
import Timer from "./Timer";
import Stopwatch from "./StopWatch";

const App = () => {
  const [isTimer, setIsTimer] = useState(true);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTime, setTimerTime] = useState(0);

  const handleTimerToggle = () => {
    setIsTimer(true);
    setTimerActive(true);
    setStopwatchActive(false);
  };

  const handleStopwatchToggle = () => {
    setIsTimer(false);
    setTimerActive(false);
  };

  const handleStopwatchStart = () => {
    setStopwatchActive(true);
  };

  const handleStopwatchStop = () => {
    setStopwatchActive(false);
  };

  const handleTimerStart = () => {
    setTimerActive(true);
  };

  const handleTimerStop = () => {
    setTimerActive(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "24px",
        backgroundColor: "#222",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleTimerToggle}
          disabled={isTimer}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            marginRight: "10px",
            fontSize: "30px",
          }}
        >
          Timer
        </button>
        <button
          onClick={handleStopwatchToggle}
          disabled={!isTimer}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "30px",
          }}
        >
          Stopwatch
        </button>
      </div>
      {isTimer ? (
        <Timer
          initialTimeInSeconds={timerTime}
          timerActive={timerActive}
          handleTimerStart={handleTimerStart}
          handleTimerStop={handleTimerStop}
          setTimerTime={setTimerTime}
        />
      ) : (
        <Stopwatch
          stopwatchActive={stopwatchActive}
          handleStopwatchStart={handleStopwatchStart}
          handleStopwatchStop={handleStopwatchStop}
          stopwatchTime={stopwatchTime}
          setStopwatchTime={setStopwatchTime}
        />
      )}
    </div>
  );
};

export default App;

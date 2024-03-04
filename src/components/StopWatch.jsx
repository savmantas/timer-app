/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Stopwatch = ({
  stopwatchActive,
  handleStopwatchStart,
  handleStopwatchStop,
  stopwatchTime,
  setStopwatchTime,
}) => {
  useEffect(() => {
    let interval;

    if (stopwatchActive) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [stopwatchActive, setStopwatchTime]);

  const formatTime = (timeInMillis) => {
    const milliseconds = Math.floor(timeInMillis % 1000);
    const seconds = Math.floor((timeInMillis / 1000) % 60);
    const minutes = Math.floor((timeInMillis / (1000 * 60)) % 60);
    const hours = Math.floor((timeInMillis / (1000 * 60 * 60)) % 24);

    const formattedMilliseconds = ("00" + milliseconds).slice(-3).slice(0, 2);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "45px",
        }}
      >
        <span>{hours}</span> &nbsp;<span>:</span> &nbsp;
        <span>{minutes}</span> &nbsp;<span>:</span> &nbsp;
        <span>{seconds}</span>&nbsp;<span>:</span> &nbsp;
        <span style={{ fontSize: "0.8em" }}>{formattedMilliseconds}</span>&nbsp;
      </div>
    );
  };

  const handleToggle = () => {
    if (!stopwatchActive) {
      handleStopwatchStart();
    } else {
      handleStopwatchStop();
    }
  };

  const handleReset = () => {
    setStopwatchTime(0);
    handleStopwatchStop();
  };

  return (
    <div>
      {formatTime(stopwatchTime)}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button
          onClick={handleToggle}
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
          {stopwatchActive ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "30px",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

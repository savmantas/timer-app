import { useState, useEffect } from "react";
import moment from "moment";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopStopwatch = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="stopwatch">
      <div>
        <span>{moment.utc(time).format("HH[h]-mm[m]-ss[s]")}</span>

      </div>
      <button
        className={isRunning ? "active" : ""}
        onClick={startStopStopwatch}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch;

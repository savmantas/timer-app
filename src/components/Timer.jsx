/* eslint-disable no-case-declarations */
import { useState, useEffect, useRef } from "react";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activePart, setActivePart] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsRunning(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              if (hours === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
              } else {
                setHours((prevHours) => prevHours - 1);
                setMinutes(59);
                setSeconds(59);
              }
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, hours]);

  const handleTimeClick = (part) => {
    setActivePart(part);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.innerText, 10);
    if (!isNaN(value)) {
      switch (activePart) {
        case "hours":
          setHours(Math.min(99, Math.max(0, value)));
          break;
        case "minutes":
          const totalMinutes = Math.min(9999, Math.max(0, value));
          setHours(Math.floor(totalMinutes / 60));
          setMinutes(totalMinutes % 60);
          break;
        case "seconds":
          const totalSeconds = Math.min(359999, Math.max(0, value));
          setHours(Math.floor(totalSeconds / 3600));
          setMinutes(Math.floor((totalSeconds % 3600) / 60));
          setSeconds(totalSeconds % 60);
          break;
        default:
          break;
      }
    }
  };

  const startStopTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <div onClick={() => handleTimeClick("hours")} style={{ display: "inline-block", cursor: "text" }}>
        <span contentEditable={activePart === "hours"} suppressContentEditableWarning onBlur={handleInputChange} ref={inputRef}>{String(hours).padStart(2, "0")}</span>h-
      </div>
      <div onClick={() => handleTimeClick("minutes")} style={{ display: "inline-block", cursor: "text" }}>
        <span contentEditable={activePart === "minutes"} suppressContentEditableWarning onBlur={handleInputChange} ref={inputRef}>{String(minutes).padStart(2, "0")}</span>m-
      </div>
      <div onClick={() => handleTimeClick("seconds")} style={{ display: "inline-block", cursor: "text" }}>
        <span contentEditable={activePart === "seconds"} suppressContentEditableWarning onBlur={handleInputChange} ref={inputRef}>{String(seconds).padStart(2, "0")}</span>s
      </div>

      <button className={isRunning ? "active" : ""} onClick={startStopTimer}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;

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
        if (seconds === 0 && minutes === 0 && hours === 0) {
          clearInterval(interval);
          setIsRunning(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prevHours) => Math.max(0, prevHours - 1));
              setMinutes(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
            }
            setSeconds(59);
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
          let convertedMinutes = value;
          let convertedHours = 0;
          if (convertedMinutes >= 60) {
            convertedHours = Math.floor(convertedMinutes / 60);
            convertedMinutes %= 60;
          }
          setMinutes(Math.min(59, Math.max(0, convertedMinutes)));
          setHours(Math.min(99, Math.max(0, hours + convertedHours)));
          break;
        case "seconds":
          let convertedSeconds = value;
          let remainingSeconds = 0;
          let convertedMinutesFromSeconds = 0;
          if (convertedSeconds >= 60) {
            convertedMinutesFromSeconds = Math.floor(convertedSeconds / 60);
            remainingSeconds = convertedSeconds % 60;
          }
          setSeconds(Math.min(59, Math.max(0, remainingSeconds)));
          let updatedMinutes = minutes + convertedMinutesFromSeconds;
          let updatedHoursFromMinutes = 0;
          if (updatedMinutes >= 60) {
            updatedHoursFromMinutes = Math.floor(updatedMinutes / 60);
            updatedMinutes %= 60;
          }
          setMinutes(Math.min(59, Math.max(0, updatedMinutes)));
          setHours(Math.min(99, Math.max(0, hours + updatedHoursFromMinutes)));
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

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Timer = ({
  initialTimeInSeconds,
  timerActive,
  handleTimerStart,
  handleTimerStop,
}) => {
  const [hours, setHours] = useState(
    Math.floor(initialTimeInSeconds / 3600) || 0
  );
  const [minutes, setMinutes] = useState(
    Math.floor((initialTimeInSeconds % 3600) / 60) || 0
  );
  const [seconds, setSeconds] = useState(initialTimeInSeconds % 60 || 0);

  useEffect(() => {
    let interval;

    if (timerActive && (hours > 0 || minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
          handleTimerStop();
          clearInterval(interval);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
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
  }, [timerActive, seconds, minutes, hours, handleTimerStop]);

  const handleToggle = () => {
    if (!timerActive) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds <= 0) return;
      const remainingHours = Math.floor(totalSeconds / 3600);
      const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      const remainingSeconds = totalSeconds % 60;
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }
    handleTimerStart();
  };

  const handleReset = () => {
    setHours(Math.floor(initialTimeInSeconds / 3600) || 0);
    setMinutes(Math.floor((initialTimeInSeconds % 3600) / 60) || 0);
    setSeconds(initialTimeInSeconds % 60 || 0);
    handleTimerStop();
  };

  const handleTimeEdit = (type, value) => {
    switch (type) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "45px",
        }}
      >
        <span
          suppressContentEditableWarning={true}
          contentEditable="true"
          onBlur={(e) =>
            handleTimeEdit("hours", parseInt(e.target.textContent) || 0)
          }
        >
          {hours}
        </span>{" "}
        &nbsp;<span>:</span> &nbsp;
        <span
          suppressContentEditableWarning={true}
          contentEditable="true"
          onBlur={(e) =>
            handleTimeEdit("minutes", parseInt(e.target.textContent) || 0)
          }
        >
          {minutes}
        </span>{" "}
        &nbsp;<span>:</span> &nbsp;
        <span
          suppressContentEditableWarning={true}
          contentEditable="true"
          onBlur={(e) =>
            handleTimeEdit("seconds", parseInt(e.target.textContent) || 0)
          }
        >
          {seconds}
        </span>
        &nbsp;
      </div>
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
          {timerActive ? "Pause" : "Start"}
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

export default Timer;

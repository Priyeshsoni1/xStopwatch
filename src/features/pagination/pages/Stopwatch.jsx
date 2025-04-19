import React, { useEffect, useRef, useState } from "react";

export const Stopwatch = () => {
  const [isRuning, setIsRunnin] = useState(false);
  const [time, setTime] = useState(0);
  const test = useRef(null);
  useEffect(() => {
    if (isRuning) {
      test.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(test.current);
    }

    // Cleanup to avoid memory leaks
    return () => clearInterval(test.current);
  }, [isRuning]);

  const formatTime = (ms) => {
    const minute = String(Math.floor(ms / 60000)).padStart(1, "0");
    const second = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");

    return `${minute}:${second}`;
  };
  return (
    <div>
      <h1>Stopwatch</h1>
      <span>
        <p>Time: {formatTime(time)}</p>
      </span>
      <button
        onClick={() => {
          setIsRunnin((prev) => !prev);
        }}
      >
        {isRuning ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setTime(0);
          setIsRunnin(false);
        }}
      >
        Reset
      </button>
    </div>
  );
};

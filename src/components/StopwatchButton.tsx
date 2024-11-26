import React, { useState, useEffect } from 'react';

const StopwatchButton: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup interval when component unmounts or intervalId changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const toggleStopwatch = () => {
    if (isRunning) {
      // Stop the stopwatch
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    } else {
      // Start the stopwatch
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setIntervalId(id);
    }

    // Toggle the running state
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div>
      <button onClick={toggleStopwatch} className="btn">
      <div>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}<br />{isRunning ? 'Stop' : 'Start'}</div>
      </button>
    </div>
  );
};

export default StopwatchButton;

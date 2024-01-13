import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1); // Assuming timeElapsed is in seconds
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    setLaps([...laps, timeElapsed]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  return (
    <View>
      <Text>{`Time: ${timeElapsed}s`}</Text>
      {laps.map((lap, index) => (
        <Text key={index}>{`Lap ${index + 1}: ${lap}s`}</Text>
      ))}
      <StopWatchButton title={isRunning ? "Stop" : "Start"} onPress={handleStartStop} />
      <StopWatchButton title="Lap" onPress={handleLap} />
      <StopWatchButton title="Reset" onPress={handleReset} />
    </View>
  );
};

export default StopWatch;

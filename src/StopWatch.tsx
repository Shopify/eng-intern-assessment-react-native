import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);


  useEffect(() => {
    let interval: number;

    if (isOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isOn]);

  const startStopwatch = () => {
    setIsOn(true);
  };

  const stopStopwatch = () => {
    setIsOn(false);
  };

  const resetStopwatch = () => {
    setIsOn(false); // Stop the interval
    setTime(0);     // Reset the time
    setLaps([]);    // Clear laps
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <View>
      <Text>{time}</Text>
      <StopWatchButton
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onRecordLap={recordLap}
      />

      {laps.length > 0 && (
        <View>
          <Text>Laps:</Text>
          {laps.map((lap, index) => (
            <Text key={index + 1}>{`Lap ${index + 1}: ${lap}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
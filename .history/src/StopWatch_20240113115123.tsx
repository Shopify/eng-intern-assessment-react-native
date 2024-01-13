import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const StopWatch = ({ isRunning, onLap }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(oldTime => oldTime + 1000);
      }, 1000);
    } else if (!isRunning && timeElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = () => {
    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const minutes = Math.floor((timeElapsed / 60000) % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      <Text>{formatTime()}</Text>
      <Button title="Lap" onPress={() => onLap(timeElapsed)} />
    </View>
  );
};

export default StopWatch;

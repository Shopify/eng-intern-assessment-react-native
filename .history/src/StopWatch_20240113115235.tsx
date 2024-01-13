// Importing necessary modules from React and React Native
import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

// TypeScript interface for props
interface StopWatchProps {
  isRunning: boolean;
  onLap: (time: number) => void;
}

const StopWatch: React.FC<StopWatchProps> = ({ isRunning, onLap }) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(oldTime => oldTime + 1000);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (): string => {
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

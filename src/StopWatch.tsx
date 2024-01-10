import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  // format time to display
  const formatTime = (time) => {
    // TO-DO: my logic to format time into hh:mm:ss
  };

  return (
    <View>
      <Text>{formatTime(time)}</Text>
      // Include buttons here
    </View>
  );
}

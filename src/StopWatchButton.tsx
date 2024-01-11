import React from 'react';
import { View, Button } from 'react-native';

interface StopWatchButtonProps {
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function StopWatchButton({ setIsRunning, setTime }: StopWatchButtonProps) {
  return (
    <View>
      {/* Button to toggle the running state of the stopwatch */}
      <Button title="Start/Stop" onPress={() => setIsRunning(prev => !prev)} />
      {/* Button to reset the stopwatch time to 0 */}
      <Button title="Reset" onPress={() => setTime(0)} />
    </View>
  );
}

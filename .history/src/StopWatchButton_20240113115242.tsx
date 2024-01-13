// Importing necessary modules from React and React Native
import React from 'react';
import { Button, View } from 'react-native';

// TypeScript interface for props
interface StopWatchButtonProps {
  onStartStop: () => void;
  onReset: () => void;
  isRunning: boolean;
  timeElapsed: number;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onStartStop, onReset, isRunning, timeElapsed }) => {
  return (
    <View>
      <Button title={isRunning ? 'Stop' : 'Start'} onPress={onStartStop} />
      <Button title="Reset" onPress={onReset} disabled={!isRunning && timeElapsed === 0} />
    </View>
  );
};

export default StopWatchButton;

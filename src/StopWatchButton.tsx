import React from 'react';
import { View, Button } from 'react-native';

interface StopWatchButtonProps {
  onPressStart: () => void;
  onPressStop: () => void;
  onPressReset: () => void;
  isRunning: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onPressStart, onPressStop, onPressReset, isRunning }) => {
  return (
    <View>
      <Button title="Start" onPress={onPressStart} disabled={isRunning} />
      <Button title="Stop" onPress={onPressStop} disabled={!isRunning} />
      <Button title="Reset" onPress={onPressReset} />
    </View>
  );
};

export default StopWatchButton;

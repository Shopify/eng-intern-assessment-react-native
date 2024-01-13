import React from 'react';
import { Button, View } from 'react-native';

const StopWatchButton = ({ onStartStop, onReset, isRunning }) => {
  return (
    <View>
      <Button title={isRunning ? 'Stop' : 'Start'} onPress={onStartStop} />
      <Button title="Reset" onPress={onReset} disabled={!isRunning && timeElapsed === 0} />
    </View>
  );
};

export default StopWatchButton;

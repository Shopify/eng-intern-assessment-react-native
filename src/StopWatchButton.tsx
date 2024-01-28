import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonsProps {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

const StopWatchButtons: React.FC<StopWatchButtonsProps> = ({ isRunning, onStartStop, onReset, onLap }) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onStartStop}>
        <Text>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onLap}>
        <Text>Lap</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    margin: 5,
  },
});

export default StopWatchButtons;

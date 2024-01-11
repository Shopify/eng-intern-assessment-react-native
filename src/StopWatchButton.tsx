import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  isRunning,
  onStartStop,
  onReset,
  onLap,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, isRunning ? styles.stopButton : styles.startButton, styles.marginRight]}
        onPress={onStartStop}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.marginRight]} onPress={onLap}>
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 240,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 10,
  },
  startButton: {
    backgroundColor: '#007BFF',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  marginRight: {
    marginRight: 25
  },
});

export default StopwatchButton;

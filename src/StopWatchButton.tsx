import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Define the types for the component props
type StopwatchButtonProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

// StopwatchButton component
const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onStart, onStop, onReset, onLap }) => {
  return (
    <View style={styles.buttonContainer}>
      {/* Start/Stop Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isRunning ? '#F5AC76' : '#F57F76' }]}
        onPress={isRunning ? onStop : onStart}
      >
        <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
      </TouchableOpacity>

      {/* Lap Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F576A1' }]}
        onPress={onLap}
        disabled={!isRunning}
      >
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F59576' }]}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet for the component
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', 
    marginTop: 20, 
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', 
  },
});

export default StopwatchButton;

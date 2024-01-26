import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

interface StopwatchButtonProps {
  isRunning: boolean;  // Prop to determine whether the stopwatch is running
  onStart: () => void;  // Callback function when the start button is pressed
  onStop: () => void;  // Callback function when the stop button is pressed
  onReset: () => void;  // Callback function when the reset button is pressed
  onLap: () => void;  // Callback function when the lap button is pressed
}

// StopwatchButton component to render start, stop, reset, and lap buttons
const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onStart, onStop, onReset, onLap }) => {
  return (
    <View style={styles.buttonContainer}>
      {/* Start/Stop button */}
      <TouchableOpacity style={styles.button} onPress={isRunning ? onStop : onStart}>
        <FontAwesome5 name={isRunning ? 'pause' : 'play'} size={24} color="#fff" />
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      
      {/* Reset button */}
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <FontAwesome5 name="undo" size={24} color="#fff" />
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      {/* Lap button */}
      <TouchableOpacity style={styles.button} onPress={onLap}>
        <FontAwesome5 name="flag" size={24} color="#fff" />
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the StopwatchButton component
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black', // Button background color
    padding: 15, // Padding around the button content
    borderRadius: 10, // Border radius for rounded corners
    alignItems: 'center', // Center items horizontally
  },
  buttonText: {
    color: '#fff', // Text color
    marginTop: 5, // Margin at the top of the text
  },
});

export default StopwatchButton;

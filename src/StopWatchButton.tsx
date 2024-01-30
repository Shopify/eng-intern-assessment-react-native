import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// isRunning: boolean val -  whether the stopwatch is currently running
// onStart: function - called when the user starts the stopwatch
// onStop: function -  called when the user stops the stopwatch
// onReset: funciton - called when the user resets the stopwatch
//onLap: function - called when user presses the lap button 

interface StopwatchButtonProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

//react function component needed - was throwing a text error prior 
//declared constant variable named StopwatchButton that expects component expects props of type StopwatchButtonProps.
//props: isRunning, onStart, onStop, onReset, onlap

//button text toggles between 'stop' and 'start' based on isRunning
//TouchableOpacity handles resetting the stopwatch - when pressed it calls the onReset function, same for lap (laps timer)
const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onStart, onStop, onReset, onLap }) => {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={isRunning ? onStop : onStart}>
        <Text style={styles.buttonText}>{isRunning ? 'stop' : 'start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onLap}>
        <Text style={styles.buttonText}>lap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  lapButton: {
    backgroundColor: '#dc3545', 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  resetButton: {
    backgroundColor: '#dc3545', 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default StopwatchButton;

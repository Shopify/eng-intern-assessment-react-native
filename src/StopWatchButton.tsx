//used to represent the start,stop,reset button
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// isRunning: boolean val -  whether the stopwatch is currently running
// onStart: function - called when the user starts the stopwatch
// onStop: function -  called when the user stops the stopwatch
// onReset: funciton - called when the user resets the stopwatch

//used an interface to show what type of structure the stopwatch should have
interface StopwatchButtonProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void; 
}


//react function component needed - was throwing a text error prior 
//declared constant variable named StopwatchButton that expects component expects props of type StopwatchButtonProps.
//props: isRunning, onStart, onStop, onReset
const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onStart, onStop, onReset }) => {

  //button text toggles between 'stop' and 'start' based on isRunning
  //TouchableOpacity handles resetting the stopwatch - when pressed it calls the onReset function
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={isRunning ? onStop : onStart}>
        <Text style={styles.buttonText}>{isRunning ? 'stop' : 'start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}> 
        <Text style={styles.buttonText}>reset</Text>
      </TouchableOpacity>
    </View>
  );
};

//styles for stopwatch button container
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
});

export default StopwatchButton;

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

interface ButtonProps {
  isRunning: boolean;
  handleRun: () => void;
  handleReset: () => void;
  handleLap: () => void;
}

const StopWatchButton: React.FC<ButtonProps> = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={
          [styles.button, props.isRunning ? {backgroundColor: "#ff0000"} : {backgroundColor: "#7cfc00"}]
        }
        onPress={props.handleRun}
      >
        <Text style={styles.buttonText}>{props.isRunning ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: "#00bfff"}]}
        onPress={props.handleReset}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: "#ffa07a"}]}
        onPress={props.handleLap}
      >
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
  },
  button: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5
  },
  buttonText: {
    fontSize: 16
  }
});

export default StopWatchButton;
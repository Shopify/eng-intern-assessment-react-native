import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  recordLap: () => void; 
  handleReset: () => void;
}

export default function StopWatchButton({ setIsRunning, setTime, recordLap, handleReset }: StopWatchButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => setIsRunning(prev => !prev)}>
        <Text style={styles.buttonText}>Start/Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={recordLap}>
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    </View>
  );
}

//Styles for the buttons

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#96bf48',
    padding: 10,
    borderRadius: 5,
    width: 100, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
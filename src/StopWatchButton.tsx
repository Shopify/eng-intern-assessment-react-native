import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Define the props interface for the StopWatchButton component
interface StopWatchButtonProps {
  onStart: () => void; // Function to be called when the Start button is pressed
  onStop: () => void;  // Function to be called when the Stop button is pressed
  onReset: () => void; // Function to be called when the Reset button is pressed
  onLap: () => void;   // Function to be called when the Lap button is pressed
}

// The StopWatchButton functional component
export default function StopWatchButton({ onStart, onStop, onReset, onLap }: StopWatchButtonProps) {
  return (
    <View>
      // Start button with an onPress event to trigger onStart
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text>Start</Text>
      </TouchableOpacity>

      // Stop button with an onPress event to trigger onStop
      <TouchableOpacity style={styles.button} onPress={onStop}>
        <Text>Stop</Text>
      </TouchableOpacity>

      // Reset button with an onPress event to trigger onReset
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>

      // Lap button with an onPress event to trigger onLap
      <TouchableOpacity style={styles.button} onPress={onLap}>
        <Text>Lap</Text>
      </TouchableOpacity>
    </View>
  );
}

// StyleSheet for the component
const styles = StyleSheet.create({
  button: {
    margin: 5,                 // Margin around each button
    borderWidth: 1,            // Border width of 1 for the button
    borderColor: '#333',       // Border color set to a dark grey
    padding: 10,               // Padding inside the button for better touch area
    alignItems: 'center',      // Align text to the center of the button
    backgroundColor: '#A0A0A0' // Background color of the button
  },
  // Add other styles as needed
});

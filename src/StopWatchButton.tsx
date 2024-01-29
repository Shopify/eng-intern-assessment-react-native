import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

export default function StopWatchButton({ onStart, onStop, onReset, onLap }: StopWatchButtonProps) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onStop}>
        <Text>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onLap}>
        <Text>Lap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#A0A0A0'
  },
  // Add other styles as needed
});

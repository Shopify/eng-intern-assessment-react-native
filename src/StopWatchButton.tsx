import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  onPress: () => void;
  title: string;
}

export default function StopWatchButton({ onPress, title }: StopwatchButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue', 
    padding: 10,
    margin: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

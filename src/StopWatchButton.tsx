import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  title: string;
  onPress: () => void;
}

const StopWatchButton: React.FC<StopwatchButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default StopWatchButton;
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  onPress: () => void;
  title: string;
}

const StopWatchButton: React.FC<StopwatchButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

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
export default StopWatchButton;

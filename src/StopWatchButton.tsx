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
    backgroundColor: 'black',
    padding: 15,
    margin: 5,
    borderRadius: 100,
    width: 100,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "500"
  },
});

export default StopWatchButton;
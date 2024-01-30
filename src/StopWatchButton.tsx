import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Interface for the props
interface StopWatchButtonsProps {
  name: string;
  onPress: () => void;
}

const StopWatchButtons: React.FC<StopWatchButtonsProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    cornerRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default StopWatchButtons;

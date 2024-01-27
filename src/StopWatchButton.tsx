import { View } from 'react-native';

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  onPress: () => void;
  title: string;
}


const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onPress, title }) => {
  let buttonColor, textColor;

  switch (title.toLowerCase()) {
    case 'stop':
      buttonColor = '#e74c3c'; // Red for stop
      textColor = '#fff';
      break;
    case 'resume':
    case 'start':
      buttonColor = '#2ecc71'; // Green for resume and start
      textColor = '#fff';
      break;
    case 'lap':
      buttonColor = '#95a5a6'; // Grey for lap
      textColor = '#fff';
      break;
    default:
      buttonColor = '#3498db'; // Default color
      textColor = '#fff';
  }

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 75,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    font: '16'
  },
});

export default StopWatchButton;
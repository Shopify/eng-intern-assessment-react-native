import { View } from 'react-native';

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  onPress: () => void;
  title: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StopWatchButton;
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const StopWatchButton = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StopWatchButton;
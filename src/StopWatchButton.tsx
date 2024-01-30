import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const StopWatchButton: React.FC<StopWatchButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled}>
      <View>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Customize the disabled button style
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
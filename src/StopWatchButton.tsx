import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type StopwatchButtonProps = {
  title: string,
  onPress: () => void,
}

const StopwatchButton = ({ title, onPress }: StopwatchButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    // Default text styles
    color: 'white',
    fontSize: 20,
  },
});

export default StopwatchButton;

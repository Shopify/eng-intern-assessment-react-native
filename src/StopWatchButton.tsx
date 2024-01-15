import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// Props for the StopwatchButton component
interface StopwatchButtonProps {
  title: string;
  onPress: () => void;
  color: string,
  background: string
}

/**
 * Button component for the Stopwatch, used for actions like Start, Stop, Pause, Resume, Reset, and Lap.
 * @param {StopwatchButtonProps} props - Props for configuring the button, including title, onPress function, color, and background color.
 */
const StopwatchButton: React.FC<StopwatchButtonProps> = ({ title, onPress, color, background }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: background}]}>
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, {color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Styles for the StopwatchButton component
const styles = StyleSheet.create({
  button:{
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff'
  },
});

export default StopwatchButton;
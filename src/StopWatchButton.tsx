import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * @interface StopwatchButtonProps
 * @property {Function} onStartPress - Callback for the "Start" button press
 * @property {Function} onStopPress - Callback for the "Stop" button press
 * @property {Function} onResetPress - Callback for the "Reset" button press
 * @property {Function} onLapPress - Callback for the "Lap" button press
 * @property {boolean} isRunning - Indicates whether the stopwatch is currently running
 */
interface StopwatchButtonProps {
  onStartPress: () => void;
  onStopPress: () => void;
  onResetPress: () => void;
  onLapPress: () => void;
  isRunning: boolean;
}

/**
 * StopwatchButton Component
 * Provides buttons for starting, stopping, resetting, and recording laps of the stopwatch.
 * @component
 *
 * @param {StopwatchButtonProps} props - Component props
 */
const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  onStartPress,
  onStopPress,
  onResetPress,
  onLapPress,
  isRunning,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {/* Start Button */}
      <TouchableOpacity style={styles.button} onPress={onStartPress} disabled={isRunning}>
        <Text>Start</Text>
      </TouchableOpacity>

      {/* Stop Button */}
      <TouchableOpacity style={styles.button} onPress={onStopPress} disabled={!isRunning}>
        <Text>Stop</Text>
      </TouchableOpacity>

      {/* Lap Button */}
      <TouchableOpacity style={styles.button} onPress={onLapPress} disabled={!isRunning}>
        <Text>Lap</Text>
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity style={styles.button} onPress={onResetPress} disabled={isRunning}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

//Styles for the StopwatchButton component
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#aaf',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
});

export default StopwatchButton;

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  onStartPress: () => void;
  onStopPress: () => void;
  onResetPress: () => void;
  onLapPress: () => void;
  isRunning: boolean;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  onStartPress,
  onStopPress,
  onResetPress,
  onLapPress,
  isRunning,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onStartPress} disabled={isRunning}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onStopPress} disabled={!isRunning}>
        <Text>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onLapPress} disabled={!isRunning}>
        <Text>Lap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onResetPress} disabled={isRunning}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

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

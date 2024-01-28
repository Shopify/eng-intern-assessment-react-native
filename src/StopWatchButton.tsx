import React from 'react';
import { View, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { styles } from './Styles';

interface StopWatchButtonProps {
  isRunning: boolean;
  onStartStop: (event: GestureResponderEvent) => void;
  onReset: (event: GestureResponderEvent) => void;
  lapTimes: string[];
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  isRunning, 
  onStartStop, 
  onReset,
  lapTimes
  }) => {
  return (
    <View >
      <TouchableOpacity style={styles.button} onPress={onStartStop}>
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>{isRunning ? 'Lap' : 'Reset'}</Text>
      </TouchableOpacity>
      <View>
        {lapTimes.map((lapTime, index) => (
          <Text key={index}>Lap {index + 1}: {lapTime}</Text>
        ))}
      </View>
    </View>
  );
};

export default StopWatchButton;
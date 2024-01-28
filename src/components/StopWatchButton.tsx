import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { styles } from '../styles/styles'; 

interface StopWatchButtonProps {
  running: boolean;
  toggleStopwatch: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running, toggleStopwatch }) => {
  return (
    <TouchableOpacity
      style={running ? styles.stopButton : styles.startButton}
      onPress={toggleStopwatch}
    >
      <Text style={running ? styles.buttonTextStart : styles.buttonTextStop}>
        {running ? 'Stop' : 'Start'}
      </Text>
    </TouchableOpacity>
  );
};

export default StopWatchButton;

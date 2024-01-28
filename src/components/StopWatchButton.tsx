import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { styles } from '../styles/styles';

interface StopWatchButtonProps {
  running: boolean;
  toggleStopwatch: () => void;
  hasStarted: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running, hasStarted, toggleStopwatch }) => {
  return (
    <TouchableOpacity
      style={running ? styles.pauseButton : styles.startButton}
      onPress={toggleStopwatch}
    >
      <Text
      style={running ? styles.buttonTextPause : hasStarted ? styles.buttonTextResume : styles.buttonTextStop }>
        {running ? 'Pause' : hasStarted ? 'Resume' : 'Start'}
      
      </Text>
    </TouchableOpacity>
  );
};

export default StopWatchButton;

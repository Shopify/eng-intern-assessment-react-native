/* component responsible for the start, pause, and resume buttons */
/* all whose functionality i've designed to exist functionally seperate from each other (share the same button) */
import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { styles } from '../styles/styles';

interface StopWatchButtonProps {
  running: boolean;
  toggleStopwatch: () => void; // function that toggles the stopwatch
  hasStarted: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ running, hasStarted, toggleStopwatch }) => {
  return (
     // button that toggles the stopwatch
    <TouchableOpacity
      style={running ? styles.pauseButton : styles.startButton}
      onPress={toggleStopwatch}
    >
      {/* Pause, Start, or Resume based on the state of the stopwatch */}
      <Text
        style={running ? styles.buttonTextPause : hasStarted ? styles.buttonTextResume : styles.buttonTextStop}>
        {running ? 'Pause' : hasStarted ? 'Resume' : 'Start'}

      </Text>
    </TouchableOpacity>
  );
};

export default StopWatchButton;

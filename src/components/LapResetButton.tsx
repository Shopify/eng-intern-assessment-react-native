
import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { styles } from '../styles/styles'; 

interface LapResetButtonProps {
  isRunning: boolean;
  onLap: () => void;
  onReset: () => void;
}

const LapResetButton: React.FC<LapResetButtonProps> = ({ isRunning, onLap, onReset }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isRunning ? styles.lapButton : styles.resetButton]}
      onPress={isRunning ? onLap : onReset}
    >
      <Text style={styles.buttonText}>{isRunning ? 'Lap' : 'Reset'}</Text>
    </TouchableOpacity>
  );
};

export default LapResetButton;

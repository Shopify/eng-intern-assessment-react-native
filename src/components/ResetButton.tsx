import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

interface ResetButtonProps {
  isRunning: boolean;
  onReset: () => void;
  onStop: () => void; 
}

const ResetButton: React.FC<ResetButtonProps> = ({ isRunning, onReset, onStop }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isRunning ? styles.stopButton : styles.resetButton]}
      onPress={isRunning ? onStop : onReset} 
      activeOpacity={0.7}
    >
      <Text style={isRunning ? styles.buttonTextStart : styles.buttonText}>
        {isRunning ? 'Stop' : 'Reset'} 
      </Text>
    </TouchableOpacity>
  );
};

export default ResetButton;

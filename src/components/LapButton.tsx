import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

interface LapButtonProps {
  isRunning: boolean;
  onLap: () => void;
}

const LapButton: React.FC<LapButtonProps> = ({isRunning, onLap }) => {
  return (
    <TouchableOpacity
      style={[ isRunning ? styles.lapButton  : styles.buttonDisabled]}
      onPress={onLap}
      disabled={!isRunning}
    >
      <Text style={styles.buttonText}>{'Lap'}</Text>
    </TouchableOpacity>
  );
};

export default LapButton;

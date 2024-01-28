
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


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

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapButton: {
    backgroundColor: '#FFC107', 
  },
  resetButton: {
    backgroundColor: '#595959',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default LapResetButton;

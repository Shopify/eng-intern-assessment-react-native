  import React from 'react';
  import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

  interface StopwatchButtonProps {
    isRunning: boolean;
    elapsedTime: number;
    onStartStop: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
  }

  const StopwatchButton: React.FC<StopwatchButtonProps> = ({
    isRunning,
    elapsedTime,
    onStartStop,
    onStop,
    onReset,
    onLap,
  }) => {
    const buttonText = elapsedTime === 0 ? 'Start' : isRunning ? 'Pause' : 'Resume';

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isRunning ? styles.resumeButton : styles.startButton,
            styles.marginRight,
          ]}
          onPress={onStartStop}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.marginRight]}
          onPress={onLap}
        >
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.marginRight]}
          onPress={onStop}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      width: 350,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#007BFF',
      borderRadius: 10,
      paddingVertical: 10,
    },
    startButton: {
      backgroundColor: '#007BFF',
    },
    resumeButton: {
      backgroundColor: '#dc3545',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    marginRight: {
      marginRight: 15,
    },
  });

  export default StopwatchButton;

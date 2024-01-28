import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  startStopwatch: () => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  lapStopwatch: () => void;
  isRunning: Boolean;
}

export default function StopWatchButton({ startStopwatch, pauseStopwatch, resetStopwatch, lapStopwatch, isRunning }: Props) {
  return (
    <View style={styles.buttonContainer}>
      {!isRunning ? (
        <>
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startStopwatch}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetStopwatch}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={pauseStopwatch}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lapButton]} onPress={lapStopwatch}>
            <Text style={styles.buttonText}>Lap</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FFC107',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  lapButton: {
    backgroundColor: '#2196F3',
  },
});
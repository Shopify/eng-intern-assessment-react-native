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
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetStopwatch}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startStopwatch}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={[styles.button, styles.lapButton]} onPress={lapStopwatch}>
            <Text style={styles.buttonText}>Lap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={pauseStopwatch}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#388E3C', // Green color
  },
  pauseButton: {
    backgroundColor: '#FFA000', // Orange color
  },
  resetButton: {
    backgroundColor: '#D32F2F', // Red color
  },
  lapButton: {
    backgroundColor: '#1976D2', // Blue color
  },
});
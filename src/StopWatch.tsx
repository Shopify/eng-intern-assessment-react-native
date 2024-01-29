import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: number|undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 10); // Update every 10 milliseconds
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  const formatTime = (timeInMilliseconds: number) => {
  const totalSeconds = Math.floor(timeInMilliseconds / 100);
  const milliseconds = timeInMilliseconds % 100;
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
};

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonContainer}>
        <StopWatchButton label={isRunning ? 'Stop' : 'Start'} onPress={handleStartStop} />
        <StopWatchButton label="Lap" onPress={handleLap} />
        <StopWatchButton label="Reset" onPress={handleReset} />
      </View>
      <View style={styles.lapContainer}>
        <Text style={styles.lapText}>Laps:</Text>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(lap)}`}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  lapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  lapText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

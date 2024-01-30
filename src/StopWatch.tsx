import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StopWatchButton } from './StopWatchButton';

export const StopWatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastLapTime, setLastLapTime] = useState<number | null>(null);
  const [laps, setLaps] = useState<number[]>([]);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [lapButtonDisabled, setLapButtonDisabled] = useState(false);

  const startStopwatch = () => {
    setIsRunning(true);
    setStartButtonDisabled(true);
    setLapButtonDisabled(false);
    setLastLapTime(Date.now());
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    setStartButtonDisabled(false);
    setLapButtonDisabled(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
    setStartButtonDisabled(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
    setLastLapTime(null);
    setStartButtonDisabled(false);
    setLapButtonDisabled(false);
  };

  const recordLap = () => {
    if (lastLapTime !== null) {
      let lapElapsedTime = time;

      if (time >= lastLapTime) {
        lapElapsedTime = time - lastLapTime;
      } else {
        // If the current time is less than the last lap time, assume lap time is the elapsed time from the start
        lapElapsedTime = time;
      }
      setLaps((prevLaps) => [
        ...prevLaps, // Append the existing laps
        lapElapsedTime, // Add the lap time interval to the laps array
      ]);
    } else {
      // Handle the first lap separately, assuming the lap time is the elapsed time from the start
      setLaps([time]);
    }

    // Set the current lap time for the next lap
    setLastLapTime(time);
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes % 60).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds % 1000).padStart(3, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds.slice(0, 2)}`;
  };

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>

        <View style={styles.buttonContainer}>
          <StopWatchButton title="Start" onPress={startStopwatch} disabled={startButtonDisabled}/>
          <StopWatchButton title="Pause" onPress={pauseStopwatch} />
          <StopWatchButton title="Stop" onPress={stopStopwatch} />
          <StopWatchButton title="Reset" onPress={resetStopwatch} />
          <StopWatchButton title="Lap" onPress={recordLap} disabled={lapButtonDisabled}/>
        </View>
      </View>

      <FlatList
        data={laps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text>{`Lap ${index + 1}: ${formatTime(item)}`}</Text>
        )}
        style={styles.lapList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  stopwatchContainer: {
    marginTop: 250,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  lapList: {
    maxHeight: 390,
    marginTop: 25,
  },
});

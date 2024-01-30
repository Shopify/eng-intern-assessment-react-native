import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import StopWatchButtons from './StopWatchButton';

interface LapTime {
  lap: number;
  time: number;
  elapsedTime: number;
}

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  const [lapTime, setLapTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [stop, setStop] = useState(false);

  const handleStartStop = () => {
    if (isRunning) {
      // Stop the stopwatch
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    } else {
      // Start the stopwatch
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentElapsedTime = Date.now() - startTime;
        setElapsedTime(currentElapsedTime);
      }, 100);
      setStop(false);
    }

    // Toggle the running state
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    // Stop the stopwatch if it's running
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    // Reset elapsed time
    setElapsedTime(0);
    setIsRunning(false);
    setLapTimes([]);
    setLapTime(0);
    setStop(false);
  };

  const handleLap = () => {
    // Initialize the lap time if it's the first lap
    const currentLapTime = elapsedTime == 0 ? 0 : elapsedTime - lapTime;
    setLapTime(elapsedTime);
    // Append the list of lap times
    let newLap = { lap: lapTimes.length + 1, time: currentLapTime, elapsedTime: elapsedTime };
    setLapTimes([...lapTimes, newLap]);
  }

  const handleStop = () => {
    // Stop the stopwatch if it's running
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    handleStartStop();
    setStop(true);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.time}> {stop ? null : formatTime(elapsedTime)}</Text>
      <View style={styles.buttonContainer}>
        {
          elapsedTime === 0 &&
          <StopWatchButtons
            name="Start"
            onPress={handleStartStop}
          />
        }
        {
          isRunning &&
          <StopWatchButtons
            name='Pause'
            onPress={handleStartStop}
          />
        }
        {
          !isRunning && 
          <StopWatchButtons
            name='Resume'
            onPress={handleStartStop}
          />
        }
        <StopWatchButtons
          name="Stop"
          onPress={handleStop}
        />
        <StopWatchButtons
          name="Reset"
          onPress={handleReset}
        />
        <StopWatchButtons
          name="Lap"
          onPress={handleLap}
        />
      </View>
      <View style={styles.lapContainer}>
        <FlatList
          data={lapTimes}
          renderItem={({ item, index }) => {
            return <View key={index} style={styles.row} testID="lap-list">
              <Text style={styles.cell}>Lap {item.lap}</Text>
              <Text style={styles.cell}>{formatTime(item.time)}</Text>
              {/* <Text style={styles.cell}>{formatTime(item.elapsedTime)}</Text> */}
            </View>
          }}
          numColumns={1}
          style={{ flexGrow: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "50%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    marginHorizontal: 15,
    padding: 10,
  },
  cell: {
    paddingRight: 10,
  },
  lapContainer: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import StopWatchButton from './StopWatchButton';



const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 10); // Increment every 10 milliseconds
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    setLaps([...laps, timeElapsed]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  const formatTimeUnit = (unit: number) => {
    // Helper function to ensure time units are always displayed with two digits
    return unit < 10 ? `0${unit}` : unit.toString();
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000); // 1 Hour = 3600000 Milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 Minute = 60000 Milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 Second = 1000 Milliseconds
    const millis = Math.floor((milliseconds % 1000) / 10); // Display only two digits for milliseconds
  
    return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}:${formatTimeUnit(millis)}`;
  };
  
  
  return (
<View style={styles.outerContainer}>
  <View style={styles.container}>
    <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
  </View>
  
  <View style={styles.buttonAndLapsContainer}>
    <View style={styles.buttonContainer}>
      <StopWatchButton title={isRunning ? "Stop" : "Start"} onPress={handleStartStop} />
      <StopWatchButton title="Lap" onPress={handleLap} />
      <StopWatchButton title="Reset" onPress={handleReset} />
    </View>
  
    <View style={styles.lapsContainer}>
      {laps.map((lap, index) => (
        <Text key={index} style={styles.lapText}>
          Lap {index + 1}: {formatTime(lap)}
        </Text>
      ))}
    </View>
  </View>
</View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Full width to center the inner container
  },
  container: {
    // Instead of minWidth, we'll use width here to ensure the container size is fixed.
    width: 350, // This width should be the same or greater than the widest possible time string.
    alignItems: 'flex-start', // This will center the text horizontally within the container.
    position: "absolute",
    top: "30%",
    left: "18%",
    justifyContent: 'center', // This will center the text vertically within the container.
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lapText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // This will arrange buttons side by side
    justifyContent: 'space-around',
    width: '50%', // Adjust as needed
    zIndex: 1,
    marginTop: -80,
  },
  lapsContainer: {
    marginTop: -30, // Adjust the margin as needed
    position: 'absolute',
    top: '80%', // Place laps below buttons
    width: '100%', // Use the full width of the screen for the laps container
    alignItems: 'center', // Center-align the lap text
  },
  buttonAndLapsContainer: {
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center', // Center-align children horizontally
    marginTop: 20,
  },  
});

export default StopWatch;


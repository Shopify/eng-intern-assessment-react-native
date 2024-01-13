import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isNightMode, setIsNightMode] = useState(false); // Add night mode state

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
    if (laps.length >= 10) {
      const newLaps = laps.slice(1);
      setLaps(newLaps);
    }
    setLaps([...laps, timeElapsed]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const formatTimeUnit = (unit: number, padSize: number = 2) => {
    return unit.toString().padStart(padSize, '0');
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millis = Math.floor((milliseconds % 1000) / 10);

    return `${formatTimeUnit(hours, 3)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}:${formatTimeUnit(millis)}`;
  };

  const dayModeStyles = {
    container: {
      // Day mode container styles
    },
    timerText: {
      // Day mode timer text styles
    },
    // ... Other day mode styles
  };

  const nightModeStyles = {
    container: {
      // Night mode container styles
      backgroundColor: 'black', // Example background color for night mode
    },
    timerText: {
      // Night mode timer text styles
      color: 'white', // Example text color for night mode
    },
    // ... Other night mode styles
  };

  const currentStyles = isNightMode ? nightModeStyles : dayModeStyles;

  return (
    <View style={{ ...styles.outerContainer, ...currentStyles.container }}>
      {/* Night Mode Button */}
      <StopWatchButton title={`Switch to ${isNightMode ? 'Day' : 'Night'} Mode`} onPress={toggleNightMode} style={styles.nightModeButton} />

      <View style={{ ...styles.container, ...currentStyles.container }}>
        <Text style={{ ...styles.timerText, ...currentStyles.timerText }}>
          {formatTime(timeElapsed)}
        </Text>
      </View>

      <View style={styles.buttonAndLapsContainer}>
        <View style={styles.buttonContainer}>
          <StopWatchButton title={isRunning ? "Stop" : "Start"} onPress={handleStartStop} />
          <StopWatchButton title="Lap" onPress={handleLap} />
          <StopWatchButton title="Reset" onPress={handleReset} />
        </View>
      </View>

      <View style={styles.lapsContainer}>
        {laps.slice(-10).map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {laps.length - index}: {formatTime(lap)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 20, // Add padding to accommodate the button
  },
  container: {
    width: 350,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lapText: {
    fontSize: 16,
  },
  buttonAndLapsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    zIndex: 1,
    marginTop: -80,
  },
  lapsContainer: {
    marginTop: -30,
    position: 'absolute',
    top: '80%',
    width: '100%',
    alignItems: 'center',
  },
  nightModeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
});

export default StopWatch;

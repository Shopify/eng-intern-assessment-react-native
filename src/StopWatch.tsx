import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

const StopWatch = () => {
  // State variables
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isNightMode, setIsNightMode] = useState(false);

  // Interval handling for timeElapsed
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 10); // Increment every 10 milliseconds
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle starting/stopping the stopwatch
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  let lapStartTime = 0;
  // Handle adding a lap
  const handleLap = () => {
    if (isRunning) {
      const lapTime = timeElapsed - lapStartTime;
      lapStartTime = timeElapsed;
      const newLaps = [...laps, lapTime];

      if (newLaps.length > 10) {
        newLaps.shift(); // Remove the oldest lap
      }

      setLaps(newLaps);
    }
  };

  // Handle resetting the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  // Handle toggling night mode
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  // Format time units
  const formatTimeUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit.toString());

  // Format the time
  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millis = Math.floor((milliseconds % 1000) / 10);

    return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}:${formatTimeUnit(millis)}`;
  };

  // Styles
  const dayModeStyles = {
    container: {},
    timerText: {},
    lapText: {},
    // ... Other day mode styles
  };

  const nightModeStyles = {
    container: {
      backgroundColor: 'black',
    },
    timerText: {
      color: 'white',
    },
    lapText: {
      color: 'white',
    },
    // ... Other night mode styles
  };

  const currentStyles = isNightMode ? nightModeStyles : dayModeStyles;

  return (
    <View style={{ ...styles.outerContainer, ...currentStyles.container }}>
      <View style={{ ...styles.container, ...currentStyles.container }}>
        <Text style={{ ...styles.timerText, ...currentStyles.timerText }}>
          {formatTime(timeElapsed)}
        </Text>
      </View>

      <View style={styles.buttonAndLapsContainer}>
        <StopWatchButton title={`Switch to ${isNightMode ? 'Day' : 'Night'} Mode`} onPress={toggleNightMode} />

        <View style={styles.buttonContainer}>
          <StopWatchButton title={isRunning ? 'Stop' : 'Start'} onPress={handleStartStop} />
          <StopWatchButton title="Lap" onPress={handleLap} />
          <StopWatchButton title="Reset" onPress={handleReset} />
        </View>

        <View style={styles.lapsContainer}>
          {laps.slice().reverse().map((lap, index) => (
            <Text key={index} style={{ ...styles.lapText, ...currentStyles.lapText }}>
              Lap {laps.length - index}: {formatTime(lap)}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: 350,
    alignItems: 'flex-start',
    position: 'absolute',
    top: '30%',
    left: '18%',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    zIndex: 1,
    marginTop: 20,
  },
  lapsContainer: {
    marginTop: 30,
    position: 'absolute',
    top: '80%',
    width: '100%',
    alignItems: 'center',
  },
  buttonAndLapsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default StopWatch;

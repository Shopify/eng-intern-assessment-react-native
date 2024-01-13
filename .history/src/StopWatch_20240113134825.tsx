import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
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
      // Remove the oldest lap (the first element) if there are already 10 laps
      const newLaps = laps.slice(1);
      setLaps(newLaps);
    }
    const currentTime = isRunning ? timeElapsed : 0; // Get the current time when lap is taken
    setLaps([...laps, currentTime]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
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
  
  const dayModeStyles = {
    container: {
      // Day mode container styles
    },
    timerText: {
      // Day mode timer text styles
    },
    lapText: {

    }
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
    lapText: {
      color: 'white',
    }
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
      <StopWatchButton title={`Switch to ${isNightMode ? 'Day' : 'Night'} Mode`} onPress={toggleNightMode}/>


        <View style={styles.buttonContainer}>
          <StopWatchButton title={isRunning ? "Stop" : "Start"} onPress={handleStartStop} />
          <StopWatchButton title="Lap" onPress={handleLap} />
          <StopWatchButton title="Reset" onPress={handleReset} />
        </View>

        <View style={styles.lapsContainer}>
          {laps.slice(-10).map((lap, index) => (
            <Text key={index} style={{...styles.lapText, ...currentStyles.lapText}}>
              Lap {laps.length - index}: {formatTime(lap)}
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
    marginTop: 20,
  },
  lapsContainer: {
    marginTop: 30, // Adjust the margin as needed
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
  nightModeButton: {
    alignItems: 'center',
    marginTop: -20,
    marginLeft: 20,
  },
});

export default StopWatch;


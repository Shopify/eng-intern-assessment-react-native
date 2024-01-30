import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';

// Declares props that will be used by the StopWatch Buttons
type Props = {

  // Keeps track of whether stopwatch is running or not
  isStopWatchRunning: boolean;

  // Function that stops time
  stopTime: () => void;

  // Function that starts time
  startTime: () => void;

  // Function that resets the time
  resetTime: () => void;

  // Functions that adds a lap to lap-list
  addLap: () => void;

};

export const StopWatchButton: React.FC<Props> = ({

  isStopWatchRunning,
  stopTime,
  startTime,
  resetTime,
  addLap,

}) => {

  // Start/Stop button color that changes depending on state
  const startStopButtonColor = isStopWatchRunning ? '#e37878' : '#57ba8d';

  return (
    <View style={styles.buttonsContainer}>
      
      {/* Add lap / Reset Time Button */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : '#383838',
            marginRight: 50,
          },
          styles.pressableButton,
        ]}
        onPress={isStopWatchRunning ? addLap : resetTime}
      >
        <Text style={{ color: 'white' }}>{isStopWatchRunning ? 'Lap' : 'Reset'}</Text>
      </Pressable>


      {/* Start/Pause Button */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : startStopButtonColor,
          },
          styles.pressableButton,
        ]}
        onPress={isStopWatchRunning ? stopTime : startTime}
      >
        <Text style={{ color: 'white' }}>{isStopWatchRunning ? 'Pause' : 'Start'}</Text>
      </Pressable>
    </View>

  );

};


// StopWatch Buttons Styles
const styles = StyleSheet.create({

  // Displays Buttons in a row
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  // Style for all buttons
  pressableButton: {
    elevation: 5,
    borderRadius: 50,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

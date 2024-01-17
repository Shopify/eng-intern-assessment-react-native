import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimerState, formatTime } from '../App';


export default function StopWatch(
  timerInfo: TimerState,
) {
  const displayTime = timerInfo.currTime - timerInfo.startTime
  const timeStr = formatTime(timerInfo);

  return (
    <View style={styles.box}>
      <Text style={styles.text}>{timeStr}</Text>
    </View>  );
}

const styles = StyleSheet.create({
  box: {
    padding: 0,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    width: "100%",
  },
});

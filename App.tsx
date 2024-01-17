import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StopButtonState, StopButtonType } from './src/StopWatchButton';


export interface TimerState {
  startTime: number;
  currTime: number;
}
const INITIAL_TIMER_STATE: TimerState = { startTime: 0, currTime: 0 };

export default function App() {

  const startClick = () => {};
  const stopClick = () => {};
  const resetClick = () => {};
  const lapClick = () => {};

  function handleButtonClick(type: StopButtonType) {
    switch (type) {
      case StopButtonType.START: startClick(); break;
      case StopButtonType.STOP: stopClick(); break;
      case StopButtonType.RESET: resetClick(); break;
      case StopButtonType.LAP: lapClick(); break;
      default: break;
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

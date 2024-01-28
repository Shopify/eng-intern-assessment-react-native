import React from 'react';
import { View } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  return (
    <View >
      <StopWatchButton title="start" onPress={()=>{console.log("something")}}/>
      <StopWatchButton title="stop" onPress={()=>{console.log("something1")}}/>
      <StopWatchButton title="lap" onPress={()=>{console.log("something2")}}/>
    </View>
  );
}
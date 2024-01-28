import React from 'react';
import { View, Text } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  return (
    <View >
      <Text>Numbers here</Text>
      <View>
        <StopWatchButton title="start" onPress={()=>{console.log("something")}}/>
        <StopWatchButton title="stop" onPress={()=>{console.log("something1")}}/>
      </View>
      <View>
        <StopWatchButton title="lap" onPress={()=>{console.log("something2")}}/>
      </View>
    </View>
  );
}
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export enum StopButtonState {
  INITIAL, 
  PLAYING,
  PAUSED, 
}

export enum StopButtonType {  
  START,
  STOP,
  RESET,
  LAP, 
  EMPTY, 
}

export const StateMapping: Record<StopButtonState, { btnLeft: StopButtonType, btnRight: StopButtonType }> = {
  [StopButtonState.INITIAL]: { btnLeft: StopButtonType.EMPTY, btnRight: StopButtonType.START },
  [StopButtonState.PLAYING]: { btnLeft: StopButtonType.LAP, btnRight: StopButtonType.STOP },
  [StopButtonState.PAUSED]: { btnLeft: StopButtonType.RESET, btnRight: StopButtonType.START },
};

export function StopwatchButton(){
  // Will generate the button depending on type
  return <Text></Text>
}
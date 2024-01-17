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

const StopwatchButtonMapping: Record<StopButtonType, { 
  text?: string,
  backgroundColor?: string;
}> = {
  [StopButtonType.START]: { text: 'Start', backgroundColor: "green" },
  [StopButtonType.STOP]: { text: 'Stop', backgroundColor: 'red'},
  [StopButtonType.RESET]: { text: 'Reset', backgroundColor: 'black' },
  [StopButtonType.LAP]: {  text: 'Lap' , backgroundColor: 'blue'},
  [StopButtonType.EMPTY]: {},
};

export default function StopWatchButton(
  type: StopButtonType, 
  buttonClick: (type: StopButtonType) => void,
) {  
  if(type === StopButtonType.EMPTY) return;
  let bgColor = StopwatchButtonMapping[type].backgroundColor
  let btnText = StopwatchButtonMapping[type].text

  return (
    <TouchableOpacity  style={{...buttonStyles.button, backgroundColor: bgColor}} onPress={() => buttonClick(type)} >
      <Text style={buttonStyles.buttonText}>{btnText}</Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 100,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
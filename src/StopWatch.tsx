import React from 'react';
import { Text, View } from 'react-native';
import { formatTime } from './utils/formatTime';
import StopwatchButton from './StopwatchButton';
import { StopwatchProps } from './types/types';

export default function Stopwatch({ time = 0, laps = [], onStart, onStop, onPause, onReset, onLap, showTime, isRunning, hasStarted }: StopwatchProps) {
  
  return (
    <View>
      {showTime ? <Text>{formatTime(time)}</Text> : null}

      {laps.length > 0 && (
        <View testID="lap-list">
          {laps.map((lap, index) => (
            <Text key={index}>{lap}</Text>
          ))}
        </View>
      )}

      <StopwatchButton
        hasStarted={hasStarted}
        isRunning={isRunning}
        onStart={onStart}
        onStop={onStop}
        onPause={onPause}
        onReset={onReset}
        onLap={onLap}
      />
    </View>
  );
}
import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { formatTime } from '../../utils/formatTime';
import StopwatchButton from '../StopwatchButton/StopwatchButton';
import { StopwatchProps } from '../../types/types';
import styles from './styles';

export default function Stopwatch({ fontsLoaded, time = 0, laps = [], onStart, onStop, onPause, onReset, onLap, showTime, isRunning, hasStarted }: StopwatchProps) {
  
    // Conditional styling: If fonts are loaded, use custom font, otherwise use default.
  const timeTextStyle = fontsLoaded ? [styles.timeText, { fontFamily: 'Roboto' }] : styles.timeText;

  // Function to render each lap item in the list.
  const renderLapItem = ({ item, index }: { item: string; index: number }) => {
    // The lap number is calculated based on the reversed order
    const lapNumber = laps.length - index;
    return (
      <View style={styles.lapTextContainer}>
        <Text style={styles.lapLabel}>Lap {lapNumber}</Text>
        <Text style={styles.lapTime}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>

      {/* Render a list of laps if there are any */}
      {laps.length > 0 &&
          <FlatList
            data={laps}
            renderItem={renderLapItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.lapListContainer}
            testID='lap-list'
          />
      }

      {/* Time display section */}
      <View style={styles.timeContainer}>
        {showTime && <View style={styles.separator}></View>}
        {showTime && <Text style={timeTextStyle}>{formatTime(time)}</Text>}
      </View>

      {/* Container for the stopwatch buttons */}
      <View style={styles.buttonContainer}>
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
    </View>
  );
}
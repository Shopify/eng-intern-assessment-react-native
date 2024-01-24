import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { formatTime } from '../../utils/formatTime';
import StopwatchButton from '../StopwatchButton/StopwatchButton';
import { StopwatchProps } from '../../types/types';
import styles from './styles';

export default function Stopwatch({ fontsLoaded, time = 0, laps = [], onStart, onStop, onPause, onReset, onLap, showTime, isRunning, hasStarted }: StopwatchProps) {
  
  const timeTextStyle = fontsLoaded ? [styles.timeText, { fontFamily: 'Roboto' }] : styles.timeText;

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

      {laps.length > 0 &&
          <FlatList
            data={laps}
            renderItem={renderLapItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.lapListContainer}
            testID='lap-list'
          />
      }

      <View style={styles.timeContainer}>
        {showTime && <View style={styles.separator}></View>}
        {showTime && <Text style={timeTextStyle}>{formatTime(time)}</Text>}
      </View>

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

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   lapListContainer: {
//     position: 'absolute',
//     top: 60,
//     width: '100%',
//     height: '65%',
//   },
//   lapTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 5,
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#c2c2c2',
//   },
//   lapLabel: {
//     color: '#FFF',
//     fontSize: 18,
//   },
//   lapTime: {
//     color: '#FFF',
//     fontSize: 18,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   timeText: {
//     fontSize: 76,
//     color: '#FFF',
//     fontFamily: 'Roboto',
//     textAlign: 'center',
//     width: 300,
//   },
//   timeContainer: {
//     position: 'absolute',
//     top: '73%',
//     alignItems: 'center',
//     width: '100%',
//     height: 100,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#FFF',
//     width: '100%',
//     marginBottom: 15,
//   },
// });

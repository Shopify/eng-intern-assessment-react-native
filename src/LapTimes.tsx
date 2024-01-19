import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { formatTime } from './util/formatTime';

interface LapTimesProps {
    lapTimes: number[];
}

const LapTimes: React.FC<LapTimesProps> = ({ lapTimes }) => {
  return (
    <View style={styles.laps}>
      <ScrollView>
        {lapTimes.map((lapTime, index) => (
          <View key={index} style={styles.lapTime}>
            <Text style={styles.lapTimeText}>Lap {lapTimes.length - index}</Text>
            <Text style={styles.lapTimeText}>{formatTime(lapTime)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  laps: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 20,
    height: '40%',
    width: '90%',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  lapTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 150,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  lapTimeText: {
    fontSize: 20,
  }
});

export default LapTimes;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatTime } from '../util/format';

interface StopWatchProps {
  time: number;
}

const StopWatch: React.FC<StopWatchProps> = (props) => {

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>
        {formatTime(props.time)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  timeText: {
    color: "#fff",
    fontSize: 24
  }
});

export default StopWatch;
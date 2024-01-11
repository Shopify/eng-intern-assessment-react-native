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
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#696969',
    margin: 15
  },
  timeText: {
    color: "#fff",
    fontSize: 28,
  }
});

export default StopWatch;
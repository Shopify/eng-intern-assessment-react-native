import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

interface StopWatchProps {
  time: number;
  laps: number[];
}

export default function StopWatch({ time, laps }: StopWatchProps) {
  return (
    <View style={styles.container}>
    <Text style={styles.lapsTitle}>Laps</Text>
      <ScrollView style={styles.lapsScrollContainer}>
        {laps.length > 0 && (
          <View style={styles.lapsContainer}>
            {laps.map((lap, index) => (
              <Text key={index} style={styles.lapText}>
                Lap {index + 1}: {lap}s
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      <Text style={styles.timeText}>{time}s</Text>
    </View>
  );
}

//Styles for the stopwatch, laps box, laps and title

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#96bf48',
  },
  lapsScrollContainer: {
    width: 300,
    maxHeight: 200, 
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingBottom: 5,
  },
  lapsContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  lapText: {
    fontSize: 20,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#96bf48',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#eef5eb',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  lapsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#96bf48',
    marginBottom: 5,
  },
});

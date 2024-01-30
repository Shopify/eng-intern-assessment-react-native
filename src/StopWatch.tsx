import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Button from './Components/Button';
import { useStopWatch } from './Hooks/useStopWatch';

const StopWatch = () => {
  const { isRunning, time, toggleTimer, resetTimer, addLap, formatTime, laps } = useStopWatch();

  const handleLap = () => {
    addLap();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <Button onPress={toggleTimer} title={isRunning ? 'Stop' : 'Start'} color={isRunning ? '#FF6347' : '#4CAF50'} />
      <Button onPress={resetTimer} title="Reset" color="#ffe433" />
      <Button onPress={handleLap} title="Lap" color="#33a3ff" />

      <FlatList
        data={laps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.lapItem}>
            <Text style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(item)}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 40,
    marginBottom: 20,
    marginTop: 100
  },
  lapItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lapText: {
    fontSize: 16,
  },
});

export default StopWatch;

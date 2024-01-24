import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import LapCell from './LapCell';

interface LapsListProps {
  laps: number[];
}

// this component is a table that renders all of the laps
export default function LapsList({ laps }: LapsListProps) {
  return (
    <ScrollView style={styles.lapListScrollContainer}>
      {laps.length > 0 && (
          <View testID="lap-list" >
            {laps.map((lapTime, index) => (
                <LapCell lapTimeInSeconds={lapTime} index={index} key={index}/>
            ))}
          </View>
      )}
    </ScrollView>
  );
}

  const styles = StyleSheet.create({
    lapCell: {
        fontSize: 16,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        borderRadius: 5,
    }, 
    lapListScrollContainer: {
        height: 50, 
        marginVertical: 50
    }});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopWatchProps {
  time: number;
  laps: number[];
}

export default function StopWatch({ time, laps }: StopWatchProps) {
    return (
        <View>
            <Text style={styles.text}>{time}s</Text>
            {laps.map((lap, index) => (
                <Text key={index} style={styles.text}>Lap {index + 1}: {lap}s</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18, // Slightly larger text
        color: '#333', // Darker text for better contrast
    }
});

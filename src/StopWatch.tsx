import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the props interface for the StopWatch component
interface StopWatchProps {
  time: number; // Represents the total time in seconds
  laps: number[]; // Array of lap times in seconds
}

// The StopWatch functional component
export default function StopWatch({ time, laps }: StopWatchProps) {
    return (
        <View>
            // Display the total time
            <Text style={styles.text}>{time}s</Text>

            // Map through the laps array and render each lap time
            {laps.map((lap, index) => (
                <Text key={index} style={styles.text}>Lap {index + 1}: {lap}s</Text>
            ))}
        </View>
    );
}

// StyleSheet for the component
const styles = StyleSheet.create({
    text: {
        fontSize: 18, // Set font size to 18 for better readability
        color: '#333', // Dark grey color for the text
    }
});

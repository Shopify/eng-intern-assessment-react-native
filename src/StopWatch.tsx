import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopwatchProps {
  elapsedTime: number; // Props to receive the elapsed time from the parent component
}

// Stopwatch component to display the elapsed time
const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime }) => {
  return (
    <View style={styles.stopwatchContainer}>
      <Text style={styles.stopwatchText}>{formatTime(elapsedTime)}</Text>
      <Text style={styles.labelText}>Countdown</Text>
    </View>
  );
};

// Function to format the time as HH:mm:ss
const formatTime = (time: number): string => {

    // Extracting hours, minutes, and seconds
    
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Styles for the Stopwatch component
const styles = StyleSheet.create({
  // Styles for the Stopwatch container
  stopwatchContainer: {
    backgroundColor: '#fff',       // Background color of the container
    padding: 20,                   // Padding around the content inside the container
    borderRadius: 10,              // Border radius for rounded corners
    marginBottom: 20,              // Margin at the bottom of the container
    alignItems: 'center',          // Center items horizontally inside the container
    justifyContent: 'center',      // Center items vertically inside the container
    shadowColor: '#000',           // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.2,            // Shadow opacity
    shadowRadius: 4,               // Shadow radius
    elevation: 5,                  // Elevation for Android shadow
  }, 

  // Styles for the Stopwatch Text
  stopwatchText: {
    fontSize: 36,                  // Font size of the elapsed time
    fontWeight: 'bold',           // Bold font weight
    color: '#333',                 // Text color
  }, 

  // Styles for the label Text
  labelText: {
    fontSize: 16,                  // Font size of the label
    marginTop: 10,                 // Margin at the top of the label
    color: '#666',                 // Text color of the label
  }, 
});

export default Stopwatch;

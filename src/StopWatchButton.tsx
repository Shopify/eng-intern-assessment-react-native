import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Import the color configuration
import colors from '../config/colors';

// Define the props interface for the StopWatchButton component
interface StopWatchButtonProps {
  onStart: () => void;    // Function to be called when the Start button is clicked
  onStop: () => void;     // Function to be called when the Stop button is clicked
  onReset: () => void;    // Function to be called when the Reset button is clicked
  onRecordLap: () => void; // Function to be called when the Lap button is clicked
}

// Define the StopWatchButton component that takes in the specified props
export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onRecordLap,
}: StopWatchButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onStart}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onStop}
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onRecordLap}
      >
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.7, 
    shadowRadius: 10, 
  },

  buttonText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 15,
  },
  container: {
    flexDirection: 'row',  
  },
});
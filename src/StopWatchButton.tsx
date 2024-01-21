import { Text, TouchableOpacity, StyleSheet } from "react-native";

// StopWatchButton Component: Renders a button for the stopwatch
export default function StopWatchButton({
  buttonText,
  onPress,
  style,
}: {
  buttonText: string; // Text to be displayed on the button
  onPress: () => void; // Function to be called when the button is pressed
  style?: object; // Optional additional styling to be applied to the button
}) {
  // Component render
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

// Styles for the StopWatchButton component
const styles = StyleSheet.create({
  button: {
    // Style for the button
    backgroundColor: "#008060", // Button background color
    padding: 25, // Padding for size
    borderRadius: 50, // Rounded shape
    margin: 5, // Margin around the button
    width: 100, // Fixed width for consistency
    height: 100, // Fixed height for consistency
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
  },
  buttonText: {
    // Style for the button text
    color: "#ffffff", // Text color
    textAlign: "center", // Align text to center
    fontSize: 16, // Font size
  },
});

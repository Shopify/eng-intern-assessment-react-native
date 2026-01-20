import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Define props type for the StopWatchButton component
interface StopwatchButtonProps {
  onPress: () => void; // Function to handle button press
  title: string;       // Text to display on the button
}

// The StopWatchButton component
const StopWatchButton: React.FC<StopwatchButtonProps> = ({ onPress, title }) => {
  return (
    // TouchableOpacity is used for the button to provide feedback on touch
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {/* Text component displays the title of the button */}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// StyleSheet for styling the button and the text inside it
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue', 
    padding: 10,             
    margin: 10,              
    borderRadius: 5,        
    minWidth: 80,           
    alignItems: 'center',  
  },
  buttonText: {
    color: 'white',      
    fontSize: 18,            
  },
});

export default StopWatchButton;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  label: string;
  onPress: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: 'dodgerblue',
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText:{
    color: 'white',
    fontSize: 16,
  },
});

export default StopWatchButton;
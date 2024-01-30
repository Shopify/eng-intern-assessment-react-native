import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonsProps {
  name: string;
  onPress: () => void;
}

const StopWatchButtons: React.FC<StopWatchButtonsProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
});

export default StopWatchButtons;

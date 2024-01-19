import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StopWatchButtonProps {
  name: string;
  color?: string; // Making the color optional
  onPress: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ name, color = 'gray', onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 90,
    borderRadius: 15,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: 'white',
  },
});

export default StopWatchButton;

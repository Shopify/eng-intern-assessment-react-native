import React from 'react';
import { TouchableOpacity, GestureResponderEvent, Text, StyleSheet } from 'react-native';

export default function StopWatchButton({ title, onPress, } : {
  title: string; 
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#66bfad',
    padding: 10,
    borderRadius: 20

}});

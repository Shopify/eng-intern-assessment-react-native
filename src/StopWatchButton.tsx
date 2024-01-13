import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function StopWatchButton(props) {
  const { onClick, color, title, disable } = props;
  return (
    <TouchableOpacity
    onPress={onClick}
    style={[styles.button, {backgroundColor: color}]}
    activeOpacity={0.6}
    disabled={disable}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 40,
    borderRadius: 30,
    marginTop: '5%'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
})
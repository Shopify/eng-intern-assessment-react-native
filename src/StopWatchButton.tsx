import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface StopWatchButtonProps {
  title: string;
  onClick: (button: string) => void;
  color: string;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  const {title, onClick, color} = props;

  return (
    <SafeAreaView style={styles.button}>
      <TouchableOpacity
        style={[styles.buttonShape, {backgroundColor: color}]}
        onPress={() => onClick(title)}
        accessibilityLabel={title}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingHorizontal: 10
  },
  buttonShape: {
    width: 100,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98bb52'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

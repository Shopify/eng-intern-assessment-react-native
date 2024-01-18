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
        style={[styles.circleContainer, {backgroundColor: color}]}
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
    margin: 20,
    paddingHorizontal: 10
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98bb52', // Change color later
    borderColor: 'black',
    borderWidth: 2
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

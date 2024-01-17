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
        <Text>{title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgrey', // Change color later
    borderColor: 'black'
  },
});

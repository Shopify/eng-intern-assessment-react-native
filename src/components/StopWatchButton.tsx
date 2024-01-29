import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface StopWatchButtonProps {
  title: string;
  onClick: () => void;
  color: string;
  isDisabled?: boolean;
}

export default function StopWatchButton(props: Readonly<StopWatchButtonProps>): React.ReactNode {
  const { title, onClick, color, isDisabled = false } = props;

  return (
    <SafeAreaView style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onClick}
        accessibilityLabel={title}
        disabled={isDisabled}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    paddingHorizontal: 2,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008fff',
    elevation: 6, // Add elevation for drop shadow on Android
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
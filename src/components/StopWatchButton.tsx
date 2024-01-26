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
    paddingHorizontal: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98bb52',
    elevation: 5, // Add elevation for drop shadow on Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
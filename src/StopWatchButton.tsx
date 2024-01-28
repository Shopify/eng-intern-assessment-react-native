import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

type StopwatchButtonProps = {
  label: string;
  onPress: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ label, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 80,
    height: 80,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 200,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#96bf48'
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default StopwatchButton;

import React from 'react';
import { Button, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  title: string;
  onPress: () => void;
  color: string,
  background: string
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ title, onPress, color, background }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: background}]}>
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, {color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  buttonTitle: {
    fontSize: 18,
    color: 'white'
  },
});

export default StopwatchButton;
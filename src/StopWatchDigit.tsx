import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { StopwatchDigitProps } from './types';

const StopwatchDigit = ({ value, adjust }: StopwatchDigitProps) => (
  <Text style={[styles.digit, value == '1' && adjust ? styles.one : null]}>{value}</Text>
);

const styles = StyleSheet.create({
  digit: {
    width: 50,
    fontSize: 90,
    fontWeight: '100',
    color: '#fff',
  },
  one: {
    width: 30,
  },
});

export default StopwatchDigit;

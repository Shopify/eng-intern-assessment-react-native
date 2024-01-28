import React from 'react';
import { View, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { styles } from './Styles';

interface StopWatchButtonProps {
  label:string,
  onClick: () => void,
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
  }) => {
  return (
    <View >
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StopWatchButton;
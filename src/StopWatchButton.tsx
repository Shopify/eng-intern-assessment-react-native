import React from 'react';
import { View, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { styles } from './Styles';


interface StopWatchButtonProps {
  label:string,
  onClick: () => void,
  textColor?: string,
  buttonColor?: string,
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
  textColor,
  buttonColor
  }) => {
  return (
    <View >
      <TouchableOpacity style={[styles.button, {backgroundColor: buttonColor}]} onPress={onClick}>
        <Text style={[styles.buttonText, {color: textColor}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StopWatchButton;
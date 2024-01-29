import { View, TouchableOpacity, Text, StyleSheet, ColorValue } from 'react-native';
import { styles } from './styles';

interface StopWatchButtonProps {
  buttonTitle: string;
  onPressButton: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({ buttonTitle, onPressButton, disabled }:StopWatchButtonProps) {
  // Return the background color based on the button title
  const defineBgColor = (buttonTitle: string): ColorValue => {
    const colorMap: { [key: string]: ColorValue } = {
      Reset: 'orange',
      Lap: '#89CFF0',
      Stop: '#E34234',
    };

    // Return the color from the map, or green(#50C878) if not found
    return colorMap[buttonTitle] || '#50C878';
  };

  const bgColor = defineBgColor(buttonTitle);
  const background = disabled ? '#c6c6c6' : bgColor;

  return (
    <View style={[styles.btnContainer, { backgroundColor: background}]}>
      <TouchableOpacity onPress={onPressButton} disabled={disabled}>
        <Text style={styles.title}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}


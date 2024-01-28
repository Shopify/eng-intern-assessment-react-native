import { View, TouchableOpacity, Text, StyleSheet, ColorValue } from 'react-native';
import { styles } from './styles';

interface StopWatchButtonProps {
  btnTitle: string;
  onPressButton: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({ btnTitle, onPressButton, disabled }:StopWatchButtonProps) {
  const defineBgColor = (btnTitle: string): ColorValue => {
    const colorMap: { [key: string]: ColorValue } = {
      Reset: 'orange',
      Lap: '#89CFF0',
      Stop: '#E34234',
    };

    return colorMap[btnTitle] || '#50C878';
  };

  const bgColor = defineBgColor(btnTitle);
  const background = disabled ? '#c6c6c6' : bgColor;

  return (
    <View style={[styles.btnContainer, { backgroundColor: background}]}>
      <TouchableOpacity onPress={onPressButton} disabled={disabled}>
        <Text style={styles.title}>{btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}


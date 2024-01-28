import { View, TouchableOpacity, Text, StyleSheet, ColorValue } from 'react-native';

interface StopWatchButtonProps {
  btnTitle: string;
  onPressButton: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({ btnTitle, onPressButton, disabled }:StopWatchButtonProps) {
  const defineBgColor = (btnTitle: string): ColorValue => {
  const colorMap: { [key: string]: ColorValue } = {
    Reset: 'orange',
    Lap: 'blue',
    Stop: 'red',
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

const styles = StyleSheet.create({
  btnContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
  }
});
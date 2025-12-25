import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CircleButtonProps {
  title: string,
  color: string,
  background: string,
  onPress: () => void
};

export default function StopWatchButton({title, color, background, onPress}: CircleButtonProps) {
  return (
    <TouchableOpacity 
      onPress = {onPress}
      style = {[styles.button, {backgroundColor: background}]}
      activeOpacity = {0.7}>
      <Text style = {[styles.buttonTitle, {color: color}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timer: {
    color: '#FFFFFF',
    fontSize: 70,
    fontWeight: "100"
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 20
  }
});
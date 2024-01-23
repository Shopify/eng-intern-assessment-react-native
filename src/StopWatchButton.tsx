import { Pressable, Text, StyleSheet } from 'react-native';

export default function StopWatchButton(
  {
    disabled,
    onPress,
    text,
  }:
    {
      disabled?: boolean,
      onPress: () => void
      text: string;
    }) {

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: disabled ? "grey" : "blue",
      borderColor: disabled ? "grey" : "blue",
      borderRadius: 3,
      borderWidth: 1,
      padding: 6,
      width: 150
    },
    CTA: {
      color: "white"
    }
  })

  return (
    <Pressable style={styles.container} disabled={disabled} onPress={onPress}>
      <Text style={styles.CTA}>{text}</Text>
    </Pressable>
  );
}
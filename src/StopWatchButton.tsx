import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
}

const StopWatchButton = ({ title, onPress }: StopWatchButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StopWatchButton;

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  text: {
    fontFamily: "Menlo",
  },
});

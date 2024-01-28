import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
}

const StopWatchButton = ({ title, onPress }: StopWatchButtonProps) => {
  let backgroundColor, borderColor, textColor;

  // Set the button colors based on the title
  if (title === "Start") {
    backgroundColor = "rgba(144, 238, 144, 0.5)";
    borderColor = "darkgreen";
    textColor = "darkgreen";
  } else if (title === "Stop") {
    backgroundColor = "rgba(238, 144, 144, 0.5)";
    borderColor = "darkred";
    textColor = "darkred";
  } else {
    backgroundColor = "white";
    borderColor = "black";
    textColor = "black";
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: backgroundColor, borderColor: borderColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
    borderColor: "grey",
    borderWidth: 1,
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  text: {
    fontFamily: "Menlo",
  },
});

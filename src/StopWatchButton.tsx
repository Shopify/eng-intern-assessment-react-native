import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface StopWatchButtonProps {
  title: "Start" | "Stop" | "Lap" | "Reset";
  onPress: () => void;
}

const StopWatchButton = ({ title, onPress }: StopWatchButtonProps) => {
  const getColors = (title: StopWatchButtonProps["title"]) => {
    switch (title) {
      case "Start":
        return ["rgba(144, 238, 144, 0.5)", "darkgreen", "darkgreen"];
      case "Stop":
        return ["rgba(238, 144, 144, 0.5)", "darkred", "darkred"];
      default:
        return ["white", "black", "black"];
    }
  };
  const [backgroundColor, borderColor, textColor] = getColors(title);

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

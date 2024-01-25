import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function StopWatchButton(props: Readonly<StopWatchButtonProps>) {
  switch (props.type) { // switch case to check which button should be returned
    case "start":
      return (
        <TouchableOpacity style={styles.StartButton} onPress={props.onClick}>
          <Text style={styles.ButtonTextDark}>{"Start"}</Text>
        </TouchableOpacity>
      );
    case "pause":
      return (
        <TouchableOpacity style={styles.GenericButton} onPress={props.onClick}>
          <Text style={styles.ButtonTextDark}>{"Pause"}</Text>
        </TouchableOpacity>
      );
    case "resume":
      return (
        <TouchableOpacity style={styles.GenericButton} onPress={props.onClick}>
          <Text style={styles.ButtonTextDark}>{"Resume"}</Text>
        </TouchableOpacity>
      );
    case "reset":
      return (
        <TouchableOpacity
          style={styles.GenericButton}
          onPress={props.onClick}
          disabled={props.isDisabled}
        >
          <Text style={styles.ButtonTextLight}>{"Reset"}</Text>
        </TouchableOpacity>
      );
    case "lap":
      return (
        <TouchableOpacity style={styles.GenericButton} onPress={props.onClick}>
          <Text style={styles.ButtonTextLight}>{"Lap"}</Text>
        </TouchableOpacity>
      );
  }
}

/*
 * props for stopwatch buttons
 */
type StopWatchButtonProps = {
  type?: "start" | "pause" | "resume" | "reset" | "lap"; // only supports these types
  onClick?: () => void;
  isDisabled?: boolean;
};

const styles = StyleSheet.create({
  GenericButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#14213d",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  StartButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    color: "#d6ebe6",
    backgroundColor: "#29bf12",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  StopButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    color: "#d6ebe6",
    backgroundColor: "#d80032",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  ButtonTextDark: {
    color: "#dad7cd",
    fontSize: 18,
  },
  ButtonTextLight: {
    color: "#ffffff",
    fontSize: 18,
  },
});

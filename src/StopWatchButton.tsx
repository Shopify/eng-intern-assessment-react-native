import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StopWatchButton(props: Readonly<StopWatchButtonProps>) {
  switch (props.type) {
    case "start":
      return (
        <TouchableOpacity style={styles.StartButton} onPress={props.onClick}>
          <Text style={styles.ButtonTextDark}>{"Start"}</Text>
        </TouchableOpacity>
      );
    case "stop":
      return (
        <TouchableOpacity style={styles.StopButton} onPress={props.onClick}>
          <Text style={styles.ButtonTextDark}>{"Stop"}</Text>
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

type StopWatchButtonProps = {
  type?: "start" | "stop" | "reset" | "lap";
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
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  StopButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    color: "#d6ebe6",
    backgroundColor: "#bc4749",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  ButtonTextDark: {
    color: "#dad7cd",
    fontSize: 18
  },
  ButtonTextLight: {
    color: "#ffffff",
    fontSize: 18
  }
});

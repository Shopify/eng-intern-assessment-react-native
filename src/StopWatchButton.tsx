import { Button, ButtonProps, View, ViewStyle } from "react-native";

type StopWatchButtonTypes = "start" | "stop" | "lap" | "reset";

const buttonProps: { [type in StopWatchButtonTypes]: ButtonProps } = {
  start: {
    title: "Start",
    color: "green",
  },
  lap: {
    title: "Lap",
    color: "blue",
  },
  stop: {
    title: "Stop",
    color: "red",
  },
  reset: {
    title: "Reset",
    color: "black",
  },
};

type StopWatchButtonProps = {
  onPress?: () => void;
  type: StopWatchButtonTypes;
};

export default function StopWatchButton(props: StopWatchButtonProps) {
  return <Button {...buttonProps[props.type]} onPress={props.onPress} />;
}

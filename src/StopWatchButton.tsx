import { Button, Text, View } from "react-native";

export default function StopWatchButton(props: StopWatchButtonProps) {
  switch (props.type) {
    case "start":
      return <View><Button onPress={props.onClick} title="Start"/></View>;
    case "stop":
        return <View><Button onPress={props.onClick} title="Stop"/></View>;
    case "reset":
        return <View><Button onPress={props.onClick} title="Reset"/></View>;
    case "lap":
        return <View><Button onPress={props.onClick} title="Lap" disabled={true}/></View>;
  }
}

type StopWatchButtonProps = {
  type?: "start" | "stop" | "reset" | "lap";
  onClick?: () => void;
  isDisabled?: boolean;
};

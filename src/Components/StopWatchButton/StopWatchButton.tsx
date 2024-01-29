import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
  colour: string;
}

const StopWatchButton = (props: StopWatchButtonProps) => {
  const { title, onPress, colour } = props;

  return (
    <View>
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.button, { backgroundColor: colour }]}>
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "orange",
    padding: 5,
  },
});

export default StopWatchButton;

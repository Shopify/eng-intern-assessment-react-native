import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const StopWatchButton = () => {
  return (
    <View>
      {/* <Button
        title="Testing"
        onPress={() => {
          Alert.alert("Testing button pressed!");
        }}
        color="red"
      /> */}
      <TouchableHighlight
        onPress={() => {
          Alert.alert("Testing button pressed!");
        }}
      >
        <View style={styles.button}>
          <Text>Testing</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   display: "flex",
  //   flexDirection: "column",
  // },
  button: {
    backgroundColor: "orange",
    padding: 5,
  },
});

export default StopWatchButton;

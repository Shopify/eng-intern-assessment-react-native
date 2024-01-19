/**
 * @author Marcin Koziel
 * @date 01/19/2024
 */

import { Text, TouchableOpacity, View } from "react-native";
import { getStyles } from "./utils/theme";

export function StopWatchButton({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  const styles = getStyles();

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
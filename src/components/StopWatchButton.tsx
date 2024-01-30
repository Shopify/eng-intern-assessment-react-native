import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StopWatchButtonProps } from '../types/ButtonProps';

export default function StopWatchButton(
  {
    action, 
    onPress, 
    height = 40,
    width = 80,
    buttonColor = "#6BBDF3",
    buttonBorderColor = "#4796D0",
    borderRadius = 8,
    isDisabled = false,
    hitslop = { top: 20, bottom: 20, left: 20, right: 20 },
    ...props
  }
  : StopWatchButtonProps) {

  //Button title is just the action name capitalized
  const buttonTitle = action.substring(0, 1).toUpperCase() + action.substring(1);

  return (
    <View
      style={{
        height: height,
        width: width,
      }}
    >
      <View 
        style={{
          backgroundColor: isDisabled ? "#484254" : buttonColor,
          borderColor: isDisabled ? "#777777" : buttonBorderColor,
          borderWidth: 1,
          borderRadius: borderRadius,
        }}
        {...props}
      >
        <TouchableOpacity
          hitSlop={hitslop}
          disabled={isDisabled}
          style={styles.button}
          onPress={!isDisabled ? onPress : () => null}
        >
          <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#FAFAFA",
  },
});

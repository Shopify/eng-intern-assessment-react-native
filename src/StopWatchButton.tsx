import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StopWatchButton(props: any) {
  const { title = '', onPress = () => {}, colour = '', isDisabled = false } = props;
  return (
    <View style={{ margin: 30 }}>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: colour }}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth:1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent:'center',
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});
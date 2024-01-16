import { Text, TouchableOpacity, View } from 'react-native';

export default function StopWatchButton(props: any) {
  const { title = '', onPress = () => {}, colour = '', isDisabled = false } = props;
  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity
        style={{
            borderWidth:1,
            borderColor: 'grey',
            alignItems: 'center',
            justifyContent:'center',
            width: 100,
            height: 100,
            backgroundColor:colour,
            borderRadius: 50,
        }}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
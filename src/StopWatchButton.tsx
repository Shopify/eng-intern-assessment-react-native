import { View, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

interface StopWatchButtonProps extends TouchableOpacityProps{
  title: string;
  onPress: () => void;
  buttonStyles: {};
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({title, onPress, buttonStyles, ...props}) => {

  return(
    <View>
      <TouchableOpacity 
      onPress={() => onPress()}
      style={buttonStyles}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );

};

export default StopWatchButton;
import {View, TouchableOpacity, TouchableOpacityProps, Text, StyleSheet} from 'react-native';

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
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center"
    }
});

export default StopWatchButton;
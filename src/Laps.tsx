import {View, Text, ScrollView, StyleSheet} from "react-native";
import formatTime from './util/FormatTime';

type LapsProps = {
    lapTimes: number[];
}

const Laps = ({ lapTimes }: LapsProps) => {

    if (lapTimes.length == 0){
        return null;
    }else{

    return(
        <ScrollView testID="lap-list" style={styles.container}>
            {lapTimes.map((lapTime, index) => (
          <Text key={index} style={styles.lapTime}>
            Lap {index + 1}: {formatTime(lapTime)}
          </Text>
        ))}
        </ScrollView>
    );

    };
};

const styles = StyleSheet.create({
    container: {
        height: 300,

    },

    lapTime: {
        fontSize: 18,
        textAlign: 'center',
        color: "#fff",
        marginBottom: 10
      },
    


})

export default Laps;

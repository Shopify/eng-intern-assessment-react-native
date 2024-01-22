import {View, Text, ScrollView, StyleSheet} from "react-native";
import formatTime from './util/FormatTime';

type LapsProps = {
    lapTimes: number[];
}

const Laps = ({ lapTimes }: LapsProps) => {

    return(
        <View style={styles.container}>
        <ScrollView>
            {lapTimes.map((lapTime, index) => (
          <Text key={index} style={styles.lapTime}>
            Lap {index + 1}: {formatTime(lapTime)}
          </Text>
        ))}
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300
    },

    lapsLabel: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left"
    },


    lapTime: {
        fontSize: 18,
        textAlign: 'left',
      },
    


})

export default Laps;

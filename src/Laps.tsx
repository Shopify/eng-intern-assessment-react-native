import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { formatTime } from './utils/timeUtil'

export default function Laps({ lapsTable }: {
        lapsTable: number[]
    }){
    
    if(lapsTable.length == 0) return null;
    else{
        return (
            <ScrollView testID='lap-list' style={styles.lapContainer}>
                {lapsTable.map((lap, index) => (
                <Text key={index} style={styles.lapText} testID= "lap-text">
                    Lap {lapsTable.length - index}     {formatTime(lap) }
                </Text>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    lapContainer: {
        width: "90%",
        alignContent: "center"
    },
    lapText: {
        fontSize: 18,
        marginHorizontal: 10,
        textAlign: "center"
    },
    lapRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
});
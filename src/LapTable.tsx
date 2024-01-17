import { ScrollView, StyleSheet, Text, View } from "react-native";
import { formatTime } from "./util/formatTime";

type LapTableProps = {
    lapTimes: number[];
};

export default function LapTable({ lapTimes }: LapTableProps) {
    const renderItem = (item : number, index  : number) => (
        <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>Lap {index + 1}</Text>
            <Text style={styles.tableCell}>{`${formatTime(item)}`}</Text>
        </View>
    );

    return (
        <View style={{height: "50%"}}>
            <View style={styles.headingsContainer}>
                <Text style={[styles.heading, { paddingLeft: 25 }]}>Lap #</Text>
                <Text style={[styles.heading, { paddingLeft: 60 }]}>Time</Text>
            </View>
            <ScrollView>
                {
                    lapTimes.length > 0 &&
                    <View testID="lap-list">
                        {lapTimes.map((item, index) => renderItem(item, index))}
                    </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        fontSize: 25,
        paddingRight: 10,
        paddingLeft: 10,
    },
    headingsContainer: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '40%',
        display: 'flex',
    },
    heading: {
        fontSize: 25,
        width: '100%',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
});
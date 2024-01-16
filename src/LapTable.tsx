import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatTime } from "./util/formatTime";

export default function LapTable({ lapTimes }: { lapTimes: number[] }) {
    const renderItem = ({ item, index }: { item: number, index: number }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Lap {index + 1}</Text>
            <Text style={styles.tableCell}>{`${formatTime(item)}`}</Text>
        </View>
    );

    return (
        <>
            {
                lapTimes.length > 0 
                &&
                <View style={styles.headingsContainer}>
                    <Text style={styles.heading}>Lap</Text>
                    <Text style={styles.heading}>Time</Text>
                </View>
            }
            <FlatList
                data={lapTimes}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem} 
            />
        </>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '25%',
        marginBottom: 8,
    },
    heading: {
        fontSize: 25,
        width: '100%',
        fontWeight: 'bold',
        paddingRight: 15,
        paddingLeft: 15,
    },
});
import {Button, StyleSheet, View} from 'react-native';

interface StopWatchButtonProps {
    label: string
    onPress: () => void

}

export default function StopWatchButton({label, onPress}: StopWatchButtonProps) {
    return (
        <View style={styles.container}>
            <Button title={label} color={'#fff'} onPress={onPress}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    text: {
        color: '#fff',
    }
})
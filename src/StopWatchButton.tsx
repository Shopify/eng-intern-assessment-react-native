import {Button, View} from 'react-native';

type stopWatchButtonProps = {
    onClick: () => void;
    text: string;
};
export default function StopWatchButton(props: Readonly<stopWatchButtonProps>) {
    return (
        <View>
            <Button title={props.text} onPress={props.onClick} />
        </View>
    );
}
import {Button, ColorValue, View} from "react-native";

type stopWatchButtonProps = {
    onClick: () => void;
    text: string;
    colour?: ColorValue;
};
export default function StopWatchButton(props: Readonly<stopWatchButtonProps>) {
    return (
        <>
            <Button color={props.colour} title={props.text} onPress={props.onClick} />
        </>
    );
}
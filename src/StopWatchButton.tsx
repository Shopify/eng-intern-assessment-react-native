import {Button, ColorValue} from "react-native";

type stopWatchButtonProps = {
    onClick: () => void;
    text: string;
    colour?: ColorValue;
    disabled?: boolean;
};
export default function StopWatchButton(props: Readonly<stopWatchButtonProps>) {
    return (
        <>
            <Button disabled={props.disabled} color={props.colour} title={props.text} onPress={props.onClick} />
        </>
    );
}
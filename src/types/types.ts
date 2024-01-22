export interface StopwatchProps {
    time: number;
    laps: string[];
}

export interface StopwatchButtonProps {
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
}
  
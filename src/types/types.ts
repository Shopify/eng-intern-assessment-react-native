export interface StopwatchProps {
    time: number;
    laps: string[];
    onStart: () => void;
    onStop: () => void;
    onPause: () => void;
    onReset: () => void;
    onLap: () => void;
    showTime: boolean;
    isRunning: boolean;
    hasStarted: boolean;
}

export interface StopwatchButtonProps {
    isRunning: boolean;
    hasStarted: boolean;
    onStart: () => void;
    onStop: () => void;
    onPause: () => void;
    onReset: () => void;
    onLap: () => void;
}
  
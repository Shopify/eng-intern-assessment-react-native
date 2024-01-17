export interface TimerState {
  startTime: number;
  currTime: number;
}
export const INITIAL_TIMER_STATE: TimerState = { startTime: 0, currTime: 0 };

export function formatTime(timerState: TimerState) {
  const displayTime = timerState.currTime - timerState.startTime;
  const minutes = Math.floor(displayTime / (60 * 1000));
  const remainingMilliseconds = displayTime % (60 * 1000);
  const seconds = Math.floor(remainingMilliseconds / 1000);
  const tenmillis = remainingMilliseconds % 100;

  const min = minutes < 10 ? "0" + minutes : minutes;
  const sec = seconds < 10 ? "0" + seconds : seconds;
  const ms = tenmillis < 10 ? "0" + tenmillis : tenmillis;

  return min + ":" + sec + ":" + ms;
}
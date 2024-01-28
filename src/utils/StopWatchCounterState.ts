/**
 * Class for stop watch counter
 */
export class StopWatchCounterState {
    centi: number = 0;
    seconds: number = 0;
    minutes: number = 0;
    startTime: number = 0; // keeps track of last start time (resumed)
    lastTime: number = 0; // keeps track of last block of time (when paused)
    laps: string[] = [];
    run: boolean = false;

    /**
     * Empty constructor
     */
    constructor() {
    }

    /**
     * updateTime puts the correct values in minutes, seconds, and centi base on millis elapsed
     * @param resetCall checks if the function is called from reset
     */
    updateTime =  (resetCall:boolean = false): void => {
        if (!this.run && !resetCall) {
            return;
        }
        let time = Date.now() - this.startTime + this.lastTime;
        this.centi = time % 1000;
        this.centi = Math.floor(this.centi / 10);
        time = Math.floor(time / 1000);
        this.seconds = time % 60;
        time = Math.floor(time / 60);
        this.minutes = time % 60;
    }

    /**
     * formats number to XX format
     * @param value number for seconds, minutes, etc.
     * @returns the number in the form of "XX"
     */
    format(value: number): string {
        return value < 10 ? `0${value}` : `${value}`;
    }

    toTimeString(): string {
        this.updateTime();
        return `${this.format(this.minutes)}:${this.format(this.seconds)}:${this.format(this.centi)}`;
    }

    /**
     * starts the counter
     */
    start = () => {
        this.reset();
        this.resume();
    }

    /**
     * resumes the counter
     */
    resume = () => {
        this.run = true;
        this.startTime = Date.now();
    }

    /**
     * pauses the counter
     */
    pause = () => {
        this.run = false;
        this.lastTime += Date.now() - this.startTime;
    }

    /**
     * resets the counter
     */
    reset = () => {
        this.lastTime = 0;
        this.startTime = Date.now();
        this.updateTime(true);
        this.laps = [];
    }

    /**
     * gets the current time (for laps)
     * @returns the current time in the form of "XX:XX:XX"
     */
    getTime(): string {
        return this.toTimeString();
    }
    
    lap = () => {
        this.laps = [this.getTime(), ...this.laps];
    }

    getLaps(): string[] {
        return this.laps;
    }
}

export const swState: StopWatchCounterState = new StopWatchCounterState();

# Shopify Stopwatch Takehome Project

## App Description
Simple stopwatch (based on the stopwatch found on iOS devices). Stopwatch functionality is as follows:

- The "Start" button initiates the timer and once started it becomes "Stop" when the stopwatch is running
- When the timer is running the "Lap" button records a lap and appends it to the lap list below the timer
- When the timer is not running, the "Reset" button will reset the timer and clear the laps

## Changes Made

Beyond the provided components (`StopWatch.tsx` and `StopWatchButton.tsx`), the `LapTimes.tsx` component was added to display the recorded lap times under the stopwatch. a util, `formatTime.tsx` was added to properly format the time string in both `LapTimes.tsx` and `StopWatch.tsx`
  
## Stopwatch demo

https://github.com/ScottJiang2001/eng-intern-assessment-react-native/assets/66347888/078963b7-3fd7-44b0-bb28-890ab210027b

## Running the Project

1. Install dependencies: `npm install`
2. Run in development: `npx expo start`

# Notes

The tests were slightly modified to address how the buttons were being rendered. Starting and stopping the timer was tested based on how the new time comapares to the old time prior to starting the timer.
    

# Tom Miller's Stopwatch

## Features

My stopwatch app has the following features:
- Start button to start/resume the timer and a stop button to pause it.
- Reset button to reset the times and laps to 0.
- Lap button to record the laps easily along with minimum and maximum laps colored to easily identifty your slowest and fastest times.


![Screenshot of the app(iPhone 15 Pro Max, iOS 17](https://github.com/HamsterStack/eng-intern-assessment-react-native/assets/108938294/94abb16c-2326-41ba-ba5a-5f7a41fae31d)




## Tests

I added a few extra tests along with the original ones, such as a test to see that the maximum and minimum laps are colored correctly
and a test to see you can't add laps while paused.

## Design Choices

- I created a useStopWatch hook to help seperate all the logic of the stopwatch and keep all components clean and simple.
- I used Date objects instead of setInterval due to it being less accurate especially for something where every second is important like a stopwatch.

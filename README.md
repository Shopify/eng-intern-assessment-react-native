# Tom Miller's Stopwatch

## Features

My stopwatch app has the following features:
- Start button to start/resume the timer and a stop button to pause it.
- Reset button to reset the times and laps to 0.
- Lap button to record the laps easily along with minimum and maximum laps colored in red and green respectively to identify your slowest and fastest times easily.


<img src="https://github.com/HamsterStack/eng-intern-assessment-react-native/assets/108938294/f1c2f8de-d75b-4b12-8a85-e05274f57adf" width="200">




## Tests

I added a few extra tests along with the original ones, such as a test to see that the maximum and minimum laps are colored correctly
and a test to ensure you can't add laps while paused.

## Design Choices

- I created a useStopWatch hook to help separate all the logic of the stopwatch and keep all components clean and simple.
- I used Date objects instead of setInterval due to it being less accurate, especially for something where every second is important like a stopwatch.

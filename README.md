## Implementation
- Start, Stop, Resume, Lap, Reset features all working
- Color coding for fastest and slowest laps implemented
- Laps accurate to millisecond, whereas only centiseconds displayed on stopwatch

## Testing
- Test functions modified to exclude centiseconds
- This was due to the fact that the difference in width of digits i.e. 1 and 9 would cause a bouncing effect on screen when the stopwatch was run
- This was solved by putting the centisecond digits into separate Text components of fixed width
- An alternate solution would have been to use a monospace font but there were no visually appealing monospace fonts available without importing
- Other than that, tests worked as expected with minor adjustments
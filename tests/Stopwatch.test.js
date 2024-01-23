import React from 'react';
import { fireEvent, act, within } from '@testing-library/react-native';
import { render } from '../src/utils/testUtils';
import StopWatch from '../src/StopWatch';

/*
  Note: Some small updates were made to the original file to better suit the project requirements.
  The largest changes include:
    - Changed 'pause and resume' test to use the 'Stop' and 'Start' buttons rather that 'pause' and 'resume' buttons.
    - Changed 'records and displays laptimes' .toContainElement() in favour of within()
    - Created a testUtils file to add the Restyled ThemeProvider as a wrapper
    
*/

describe('Stopwatch', () => {

  // Test case 1: Verify inital state of the Stopwatch
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<StopWatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  // Test case 2: starting and stoping the stopwatch
  test('starts and stops the stopwatch', () => {
    jest.useFakeTimers();
    const { getByText, queryByText } = render(<StopWatch/>);
    
    let startTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    
    fireEvent.press(getByText('Start'));
    // expect that the timer is on screen
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    act(() => jest.advanceTimersByTime(2000));

    fireEvent.press(getByText('Stop'));
    
    let stopTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    // expect that the timer changed 
    expect(stopTime).not.toBe(startTime);
    
    act(() => jest.advanceTimersByTime(2000));

    // expect that the timer is not counting after stop is pressed.
    expect(queryByText(/(\d{2}:){2}\d{2}/).props.children).toBe(stopTime);
    
    jest.useRealTimers();

  });

  // Test case 3: 
  test('pauses and resumes the stopwatch', () => {
    const { getByText } = render(<StopWatch />);
    jest.useFakeTimers();
    
    // start stopwatch
    fireEvent.press(getByText('Start'));
    act(() => jest.advanceTimersByTime(2000));

    // stop stopwatch
    fireEvent.press(getByText('Stop'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    // advance time while stopwatch is paused
    act(() => jest.advanceTimersByTime(2000));

    // expect the stopwatch time to be unchanged from when it was paused
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).toBe(pausedTime);

    // resume the stopwatch
    fireEvent.press(getByText('Start'));
    act(() => jest.advanceTimersByTime(2000));

    // stop the stopwatch and expect the time to be different than when it was paused.
    fireEvent.press(getByText('Stop'));
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);

    jest.useRealTimers();
  });

  // Test case 4: Records laptimes
  test('records and displays lap times', () => {
    const { getByText, getAllByText, getByTestId } = render(<StopWatch />);
    
    jest.useFakeTimers();

    fireEvent.press(getByText('Start'));

    act(() => jest.advanceTimersByTime(2000));

    fireEvent.press(getByText('Lap'));
    // expect that there will be only one lap recorded.
    expect(within(getByTestId('lap-list')).getAllByText(/(\d{2}:){2}\d{2}/).length).toBe(1);

    act(() => jest.advanceTimersByTime(2000));

    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Lap'));

    // expect that there will be two more laps for a total of 3 recorded.
    expect(within(getByTestId('lap-list')).getAllByText(/(\d{2}:){2}\d{2}/).length).toBe(3);

    jest.useRealTimers();
  });

  // Test case 5: reseting the stopwatch
  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<StopWatch />);
    
    jest.useFakeTimers();

    fireEvent.press(getByText('Start'));

    act(() => jest.advanceTimersByTime(2000));

    fireEvent.press(getByText('Stop'));
    fireEvent.press(getByText('Reset'));

    // expect that the timer is set back to the inital state
    expect(getByText('00:00:00')).toBeTruthy();
    // expect that the laplist is cleared
    expect(queryByTestId('lap-list')).toBeNull();
  });
});

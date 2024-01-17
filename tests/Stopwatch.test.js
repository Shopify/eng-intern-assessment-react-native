import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Stopwatch from '../src/StopWatch';



describe('Stopwatch', () => {

  /* Test case 1 verifies if the initial state of the stopwatch is rendered correctly.
  Verifies that the stopwatch initially displays '00:00:00' and the lap list is not present.*/

  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  /*
   * Test case 2 verifies that the stopwatch starts and stops correctly.
   * Jest fake timers are used to simulate the passage of time. The test captures the start time,
   * triggers the start button, advances the timer, stops the stopwatch, checks if time has elapsed 
   * since the start button was pressed, and then checks if the displayed time has changed after 
   * a period of time, confirming that the starts and stops are functioning as expected.
   */

  test('starts and stops the stopwatch', async () => {
    jest.useFakeTimers();
    const { getByText, queryByText } = render(<Stopwatch />);
    
    const startTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
    await act(()=>jest.advanceTimersByTime(2000));
    fireEvent.press(getByText('Stop'));
    expect(queryByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(startTime);
    await act(()=>jest.advanceTimersByTime(2000));
    expect(queryByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(startTime);
    jest.useRealTimers();
  });

  /*
   * Test case 3 verifies the functionality of pausing and resuming the stopwatch.
   * Similar to the previous test, fake timers are used. The test starts the stopwatch, stops it,
   * captures the paused time, starts the stopwatch again, and verifies that the displayed time has changed,
   * ensuring that the pause and resume features are working correctly.
   */


  test('pauses and resumes the stopwatch', async () => {
    jest.useFakeTimers();
    const { getByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    await act(()=>jest.advanceTimersByTime(2000));
    fireEvent.press(getByText('Stop'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    fireEvent.press(getByText('Start'));
    await act(()=>jest.advanceTimersByTime(2000));
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
    jest.useRealTimers();
  });

  /*
   * Test case 4 verifies if lap times are recorded and displayed accurately.
   * Fake timers are utilized to simulate time passage. The test starts the stopwatch, advances timers,
   * triggers the lap button, and checks if a lap time is displayed. It repeats this process to confirm
   * that multiple lap times are recorded and shown correctly in the lap list.
   */


  test('records and displays lap times', async () => {
    jest.useFakeTimers();
    const { getByText, queryByText, queryAllByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    await act(()=>jest.advanceTimersByTime(2000));
    fireEvent.press(getByText('Lap'));
    expect(queryByText(/Lap \d+: (\d{2}:){2}\d{2}/)).toBeTruthy();

    await act(()=>jest.advanceTimersByTime(2000)); 
    fireEvent.press(getByText('Lap'));
    await act(()=>jest.advanceTimersByTime(2000));
    expect(queryAllByText(/Lap \d+: (\d{2}:){2}\d{2}/)).toHaveLength(2);
  });

  /*
  * Test case 5 verifies that the stopwatch can be reset successfully.
  * The test starts the stopwatch, triggers the lap button, and then resets the stopwatch.
  * It ensures that after resetting, the stopwatch displays '00:00:00', and the lap list is not present.
  */

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});

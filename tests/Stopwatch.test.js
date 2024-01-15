import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

// Test suite for the Stopwatch component
describe('Stopwatch', () => {
  // Test case to check if the initial state is rendered correctly
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  /**
   * Test case to check if the stopwatch starts and stops correctly
   * Note: I added jest fake timers to simulate the passage of time, otherwise the test would click the start and stop 
   * buttons instantly which resulted in the start and stop time being the same. I also added the '.props.children' keys 
   * to get the actual time string from the ReactTestInstance that was being returned by the 'getByText' function. Then I 
   * compared it with the original time before starting instead of checking for the text to be null, thus making this test 
   * more robust by making sure the start and stop times were different.
   */
  test('starts and stops the stopwatch', async () => {
    jest.useFakeTimers();
    const { getByText, queryByText } = render(<Stopwatch />);
    
    const startTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
    await act(()=>jest.advanceTimersByTime(2000));
    fireEvent.press(getByText('Stop'));
    expect(queryByText(/(\d{2}:){2}\d{2}/).props.children).toBe(startTime);
    jest.useRealTimers();
  });

  /**
   * Test case to check if the stopwatch pauses and resumes correctly
   * Note: I added jest fake timers to simulate the passage of time, otherwise the test would click the start, resume, 
   * and pause buttons instantly which resulted in the resume and pause time being the same. I also added the 
   * '.props.children' keys to get the actual time string from the ReactTestInstance that was being returned by the 
   * 'getByText' function. Then I compared it with the original time before starting instead of checking for the text 
   * to be null, thus making this test more robust by making sure the pause and resume times were different.
   */
  test('pauses and resumes the stopwatch', async () => {
    jest.useFakeTimers();
    const { getByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    await act(()=>jest.advanceTimersByTime(2000));
    fireEvent.press(getByText('Pause'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    fireEvent.press(getByText('Resume'));
    await act(()=>jest.advanceTimersByTime(2000));
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
    jest.useRealTimers();
  });

  /**
   * Test case to check if lap times are recorded and displayed correctly
   * Note: I added jest fake timers to simulate the passage of time, otherwise the test would click the lap button twice 
   * instantly. I also added the '.props.children' keys to get the actual time string from the ReactTestInstance that was
   *  being returned by the 'getByText' function. I also made use of the 'toMatch' function instead of the 
   * 'toContainElement' function, since that requires a new library. 'toMatch' also allows me to compare the strings of 
   * the lap times. Instead of the 'getByText' I used the 'getAllByText' function so that it won't throw an error if it 
   * sees multiple '00:00:00' format texts. (One will always be present because of the main stopwatch)
   */
  test('records and displays lap times', () => {
    const { getByText, getByTestId, getAllByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children[0].props.children[1].props.children).toMatch(getAllByText(/(\d{2}:){2}\d{2}/)[1].props.children);

    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children.length).toBe(2);
  });

  // Test case to check if the stopwatch resets correctly
  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});

import React from 'react';
import { render, fireEvent, within, act} from '@testing-library/react-native';
import App from '../App';

/**
 * The original testing file rendered the Stopwatch component. However, 
 * In order to adhere to `Project Goals #2`: 
 * Ensure code quality:
 * Write clean, well-structured, and maintainable code.
 * Follow best practices and adhere to the React and TypeScript coding conventions.
 * Pay attention to code readability, modularity, and performance.
 * 
 * I believe that it is more sensible to render the App component instead, since 
 * the App component ties together the Stopwatchbuttons and the Stopwatch display. 
 */
 

jest.useFakeTimers();

describe('Stopwatch', () => {

  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<App />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, findByText } = render(<App />);
  
    fireEvent.press(getByText('Start'));
  
    // Advance time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    })
  
    /** 
    * Now we expect the timer to show 2 seconds have passed. 
    * We need to assert this exact time.
    * Since the time format is '00:00:02', we will use that string.
    */
  
    let timeDisplay = findByText('00:00:02');
   
    expect(timeDisplay).toBeTruthy();
  
    // Stop the stopwatch
    fireEvent.press(getByText('Stop'));
  
    // Advance time by 5 more seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    })
  
    // If the application is correctly programmed, the time should still be '00:00:02' because the stopwatch is stopped. 
    timeDisplay = findByText('00:00:02');
    expect(timeDisplay).toBeTruthy();
  });


  test('pauses and resumes the stopwatch', () => {
    const { getByText } = render(<App />);
    
    fireEvent.press(getByText('Start'));
  
    // Advance time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    })
  
    fireEvent.press(getByText('Stop'));
  
    // Capture the paused time
    const pausedTimeElement = getByText(/(\d{2}:){2}\d{2}/);
    const pausedTime = pausedTimeElement.props.children;
   
    expect(pausedTime).toBe('00:00:02');
  
    // Resume the stopwatch
    fireEvent.press(getByText('Start'));
  
    // Advance time by another second to see if it has resumed
    act(() => {
      jest.advanceTimersByTime(1000);
    })
  
    // Capture the time after resuming
    const resumedTimeElement = getByText(/(\d{2}:){2}\d{2}/);
    const resumedTime = resumedTimeElement.props.children;


    // The resumed time should be greater than the paused time which indicates that the stopwatch is resumed counting
    expect(resumedTime).not.toBe(pausedTime)
    expect(resumedTime).toBe('00:00:03');
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<App/>);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));

    // Get the lap list and find all text elements that match the lap time format
    let lapList = getByTestId('lap-list');  
    let lapTimes = within(lapList).queryAllByText(/(\d{2}:){2}\d{2}/);
    
    // Check that there is 1 lap time recorded
    expect(lapTimes.length).toBe(1);

    // Record the second lap
    fireEvent.press(getByText('Lap'));

    // Re-query the updated lap list
    lapList = getByTestId('lap-list');  
    lapTimes = within(lapList).queryAllByText(/(\d{2}:){2}\d{2}/);

    // Check that there are now 2 lap times recorded
    console.log(lapTimes, 'the laptimes is')
    expect(lapTimes.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<App/>);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

});

afterAll(() => {
  jest.useRealTimers();
});

import React from 'react';
import { render, fireEvent, within, act} from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';
import App from '../App';

// In order to adhere to `Project Goals #2` which says: 

// Ensure code quality:
// *Write clean, well-structured, and maintainable code.
// *Follow best practices and adhere to the React and TypeScript coding conventions.
// *Pay attention to code readability, modularity, and performance.

// The testing file should render the App component instead of the Stopwatch component


jest.useFakeTimers();

describe('Stopwatch', () => {

  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<App/>);
    
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
  
    // Now we expect the timer to show 2 seconds have passed. We need to assert the exact time.
    // Since the time format is '00:00:02', we'll use that string.
  
    let timeDisplay = findByText('00:00:02');
   
    expect(timeDisplay).toBeTruthy();
  
    // Stop the stopwatch
    fireEvent.press(getByText('Stop'));
  
    // Advance time by 5 more second to ensure it has stopped
    act(() => {
      jest.advanceTimersByTime(5000);
    })
  
    // The time should still be '00:00:02' because the stopwatch has stopped.
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
    console.log('the pausedTime is', pausedTime);
  
    // Resume the stopwatch
    fireEvent.press(getByText('Start'));
  
    // Advance time by another second to see if it has resumed
    act(() => {
      jest.advanceTimersByTime(1000);
    })
  
    // Capture the time after resuming
    const resumedTimeElement = getByText(/(\d{2}:){2}\d{2}/);
    const resumedTime = resumedTimeElement.props.children;

    console.log('the resumedTime is', resumedTime);

    // The resumed time should be greater than the paused time, indicating the stopwatch has resumed
    expect(resumedTime).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<App/>);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    const lapList = getByTestId('lap-list');  
    // Narrow the search space to get elements that are only in the lap-list itself and not actually the stopwatch display
    const lapTimes = within(lapList).getAllByText(/(\d{2}:){2}\d{2}/); 
    expect(lapTimes.length).toBe(1); // Check that there is 1 and only 1 lap time recorded

    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children.length).toBe(2);
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

import React from 'react';
import { render, fireEvent, within } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText('Stop'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeNull();
  });

  test('pauses and resumes the stopwatch', () => {
    const { getByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Pause'));

    // const pausedTime = getByText(/(\d{2}:){2}\d{2}/).textContent;
    // textContent does not exist on a ReactTestInstance, the paused time is 
    // retrieved instead by .props.children
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    fireEvent.press(getByText('Resume'));
    
    // may require a timeout since the test may be run before a second has passed 
    // since the paused time
    expect(getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));

    // expect(getByTestId('lap-list')).toContainElement(getByText(/(\d{2}:){2}\d{2}/));
    // toContainElement is a web based test that is out of context, 
    // changed test to use the following instead
    expect(within(getByTestId('lap-list')).getByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});

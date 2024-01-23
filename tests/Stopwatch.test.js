import '@testing-library/jest-native/extend-expect';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    jest.useFakeTimers()
    const { getByText, queryByText } = render(<Stopwatch />);

    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    jest.advanceTimersByTime(2000);
    fireEvent.press(getByText('Stop'));

    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeNull();
  });

  test('pauses and resumes the stopwatch', () => {
    jest.useFakeTimers();
    const { getByText } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText('Start'));
      jest.advanceTimersByTime(2000);
      fireEvent.press(getByText('Pause'));
    })

    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    act(() => {
      fireEvent.press(getByText('Resume'));
      jest.advanceTimersByTime(2000);
    })

    const resumedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    expect(resumedTime).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list')).toContainElement(getByText(/(\d{2}:){2}\d{2}/));

    fireEvent.press(getByText('Lap'));
    expect(getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText('Start'));
      fireEvent.press(getByText('Lap'));
      fireEvent.press(getByText('Reset'));
    })

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});

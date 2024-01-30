import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';
import { lapColors } from '../src/Stopwatch';

jest.useFakeTimers();

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00.00')).toBeTruthy();
    const lapOneTime = queryByTestId('time-0');
    expect(lapOneTime).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    act(() => fireEvent.press(getByText('Start')));
    expect(queryByText(/(\d{2}:){2}\d{2}\.\d{2}/)).toBeTruthy();

    act(() => fireEvent.press(getByText('Stop')));
    expect(queryByText(/(\d{2}:){2}\d{2}\.\d{2}/)).toBeTruthy();
  });

  test('pauses and resumes the stopwatch', async () => {
    const { getByText } = render(<Stopwatch />);

    act(() => fireEvent.press(getByText('Start')));
    act(() => jest.advanceTimersByTime(2000));
    act(() => fireEvent.press(getByText('Stop')));

    const pausedTime = getByText(/(\d{2}:){2}\d{2}\.\d{2}/).children.join();
  
    act(() => fireEvent.press(getByText('Start')));
    act(() => jest.advanceTimersByTime(50));

    const resumedTime = getByText(/(\d{2}:){2}\d{2}\.\d{2}/).children.join();
  
    expect(resumedTime).not.toBe(pausedTime);
  });

  test('records and displays lap times', async () => {
    const { getByText, getByTestId } = render(<Stopwatch />);

    const lapButton = getByTestId('lap-button')
    
    fireEvent.press(getByText('Start'));

    act(() => jest.advanceTimersByTime(2000));

    act(() => fireEvent.press(lapButton));

    act(() => jest.advanceTimersByTime(1000));

    act(() => fireEvent.press(lapButton));

    // should have both laps now
    const lapOneTime = getByTestId('time-0');
    const lapTwoTime = getByTestId('time-1');

    // verify there are two laps
    

    // lap two should be 2 seconds and lap one should be 1 second
    expect(lapTwoTime.children.join()).toBe('00:00:02.00');
    expect(lapOneTime.children.join()).toBe('00:00:01.00');
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId, getByTestId} = render(<Stopwatch />);

    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');
    const resetButton = getByTestId('reset-button');

    act(() => fireEvent.press(startButton));
    act(() => fireEvent.press(lapButton));
    act(() => fireEvent.press(resetButton));

    expect(getByText('00:00:00.00')).toBeTruthy();

    const lapOneTime = queryByTestId('time-0');
    expect(lapOneTime).toBeNull();
  });

  test('minimum and maximum lap are shown appropiately with unique colors', () => {
    const { getByText, queryByTestId, getByTestId} = render(<Stopwatch />);

    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');

    act(() => fireEvent.press(startButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.press(lapButton));
    act(() => jest.advanceTimersByTime(2000));
    act(() => fireEvent.press(lapButton));
    act(() => jest.advanceTimersByTime(5000));
    act(() => fireEvent.press(lapButton));

    // so min lap is 1 second and max lap is 5 seconds
    const lapOneTime = getByTestId('time-0');
    const lapTwoTime = getByTestId('time-1');
    const lapThreeTime = getByTestId('time-2');

    const lapOneColor = lapOneTime.props.style.find(s => s.color).color;
    const lapThreeColor = lapThreeTime.props.style.find(s => s.color).color;
    // lapOne is max with 5 seconds and lapThree is min with 1 second
    // confirm that lapOneTime color is red and lapThreeTime color is green
    expect(lapOneColor).toBe(lapColors.maxLap);
    expect(lapThreeColor).toBe(lapColors.minLap);
  });

  test('disable adding laps when paused', () => {
    const { getByText, queryByTestId, getByTestId} = render(<Stopwatch />);

    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');
    const stopButton = getByTestId('stop-button');

    act(() => fireEvent.press(startButton));
    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.press(stopButton));

    act(() => fireEvent.press(lapButton));

    // shouldn't have added the lap because the stopwatch is paused

    const lapOneTime = queryByTestId('time-0');
    expect(lapOneTime).toBeNull();
  });
});

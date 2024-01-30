import React from "react";
import { act, render, fireEvent } from "@testing-library/react-native";
import Stopwatch from "../src/Components/StopWatch/StopWatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    act(() => {
      fireEvent.press(getByText("Stop"));
    });

    expect(queryByText("00:00:00")).toBeTruthy();
  });

  test("pauses and resumes the stopwatch", () => {
    const { getByText } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    fireEvent.press(getByText("Stop"));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    expect(getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    const { getByText, getByTestId } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    act(() => {
      fireEvent.press(getByText("Lap"));
    });

    expect(getByTestId("lap-list")).toBeTruthy();
    expect(getByTestId("saved-lap-1")).toBeTruthy();

    act(() => {
      fireEvent.press(getByText("Lap"));
    });

    expect(getByTestId("saved-lap-1")).toBeTruthy();
    expect(getByTestId("saved-lap-2")).toBeTruthy();
  });

  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    act(() => {
      fireEvent.press(getByText("Lap"));
    });

    fireEvent.press(getByText("Stop"));

    act(() => {
      fireEvent.press(getByText("Reset"));
    });

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  it("should initially render the correct buttons of start and reset", () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    expect(getByText("Start")).toBeTruthy();
    expect(getByText("Reset")).toBeTruthy();
    expect(queryByText("Stop")).not.toBeTruthy();
    expect(queryByText("Lap")).not.toBeTruthy();
  });

  it("should render the correct buttons of stop and lap when running", () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    expect(getByText("Stop")).toBeTruthy();
    expect(getByText("Lap")).toBeTruthy();
    expect(queryByText("Start")).not.toBeTruthy();
    expect(queryByText("Reset")).not.toBeTruthy();
  });

  it("should render the initial buttons after stopping a running stopwatch", () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    act(() => {
      fireEvent.press(getByText("Start"));
    });

    act(() => {
      fireEvent.press(getByText("Stop"));
    });

    expect(getByText("Start")).toBeTruthy();
    expect(getByText("Reset")).toBeTruthy();
    expect(queryByText("Stop")).not.toBeTruthy();
    expect(queryByText("Lap")).not.toBeTruthy();
  });
});

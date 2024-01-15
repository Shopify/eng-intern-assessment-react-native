import React from "react";
import { render, fireEvent, within } from "@testing-library/react-native";
import StopWatch from "../src/components/StopWatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryByTestId } = render(<StopWatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", () => {
    const { getByText, queryByText, getAllByText } = render(<StopWatch />);

    fireEvent.press(getByText("Start"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText("Pause"));
    expect(queryByText("00:00:00")).not.toBeNull();
  });

  test("pauses and resumes the stopwatch", () => {
    const { getByText } = render(<StopWatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Pause"));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/);

    fireEvent.press(getByText("Start"));
    expect(getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    const { getByText, getByTestId } = render(<StopWatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));

    const lapList = getByTestId("lap-list");
    expect(within(lapList).getByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText("Lap"));
    expect(getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<StopWatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    fireEvent.press(getByText("Reset"));

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });
});

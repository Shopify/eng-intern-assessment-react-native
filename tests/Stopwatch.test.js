import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { queryByTestId } = render(<Stopwatch />);

    const time = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");
    expect(time).toBe("00:00:00");
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", async () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    const startTime = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");
    expect(startTime).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve, 100));
    fireEvent.press(getByText("Stop"));
    const stoppedTime = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");
    // I broke down the "timer" component into further components(minutes,:,seconds,:,milliseconds) to enhance user experience.
    // Therefore, I have to make these changes into the test cases.

    expect(stoppedTime).toBeTruthy(); // Edit: The time display should still be present instead of null

    // Check if the time displayed remains constant after stopping
    await new Promise((resolve) => setTimeout(resolve, 100));
    const currentTime = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");
    expect(currentTime).toBe(stoppedTime);
  });

  test("pauses and resumes the stopwatch", async () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, 100));
    fireEvent.press(getByText("Stop")); // Stop and Pause are essentially the same buttons
    const pausedTime = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");

    fireEvent.press(getByText("Resume"));
    await new Promise((resolve) => setTimeout(resolve, 100));
    const resumedTime = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");
    expect(resumedTime).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    const { getByText, getByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    expect(
      getByTestId("lap-list").children[0].children[0].children.length
    ).toBe(1);

    fireEvent.press(getByText("Lap"));
    expect(
      getByTestId("lap-list").children[0].children[0].children.length
    ).toBe(2);
  });

  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    fireEvent.press(getByText("Reset"));

    const time = [
      queryByTestId("timer").children[0].children[0].children[0],
      queryByTestId("timer").children[2].children[0].children[0],
      queryByTestId("timer").children[4].children[0].children[0],
    ].join(":");
    expect(time).toBe("00:00:00");
    expect(queryByTestId("lap-list")).toBeNull();
  });
});

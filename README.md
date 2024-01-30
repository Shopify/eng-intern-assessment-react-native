# Joshua Fung Submission for Shopify 2024 Mobile Engineering Assessment

This is my submission for the Shopify 2024 Mobile Engineering Assessment, thank you for your time and consideration! :)

Truthfully, I would have liked to have put in more time and polished it more (as well as more test cases), however, I have been very tight on time and extremely jetlagged due to flying across the world for my upcoming academic exchange.

I have included some considerations and changes I have made in the sections below:.

## Considerations

- The test cases seemed to suggest 4 separate buttons which seemed excessive from a user's perspective -- Instead, I went for a two button approach:

  - When the stopwatch has not started / has stopped, we have the 'start' and 'reset' buttons
    - Start -> Starts the stopwatch and begins counting time
    - Reset -> Resets the saved time and clears all laps
  - When the stopwatch is running, we have the 'stop' and 'lap' buttons
    - Stop -> Pauses the stopwatch and halts its count
    - Lap -> Takes the elapsed time and adds it to the state as another lap

- File structure was also slightly modified to break it down into more subfolders. Initially I was going to put what is currently in `StopWatch.tsx` into a `Screens` folder, but I didn't want to deviate too much.

## (Test) Changes

- The given `records and displays lap time` test was having a lot of issues, incl. the usage of `toContainElement()` as it's meant for web DOM elements rather than React Native components -> Checked for existence instead
- Given tests' usage of `.textContent` seemed to also be having issues -> Used `.props.children` instead
- Wrapped fire events that caused state changed with `act()`
  - However, I acknowledge that the fire event for pressing the "Lap" button is still triggering a warning (albeit being wrapped)

---

# Technical Instructions

1. Fork this repo to your local Github account.
2. Create a new branch to complete all your work in.
3. Test your work using the provided tests
4. Create a Pull Request against the Shopify Main branch when you're done and all tests are passing

# Project Overview

The goal of this project is to implement a stopwatch application using React Native and TypeScript. The stopwatch should have the following functionality:

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

You will be provided with a basic project structure that includes the necessary files and dependencies. Your task is to write the code to implement the stopwatch functionality and ensure that it works correctly.

## Project Setup

To get started with the project, follow these steps:

1. Clone the project repository to your local development environment.

2. Install the required dependencies by running npm install in the project directory.

3. Familiarize yourself with the project structure. The main files you will be working with are:

   - /App.tsx: The main component that renders the stopwatch and handles its functionality.
   - src/Stopwatch.tsx: A separate component that represents the stopwatch display.
   - src/StopwatchButton.tsx: A separate component that represents the start, stop, and reset buttons.

4. Review the existing code in the above files to understand the initial structure and component hierarchy.

## Project Goals

Your specific goals for this project are as follows:

1. Implement the stopwatch functionality:

   - The stopwatch should start counting when the user clicks the start button.
   - The stopwatch should stop counting when the user clicks the stop button.
   - The stopwatch should reset to zero when the user clicks the reset button.
   - The stopwatch should record and display laps when user clicks the lap button.

2. Ensure code quality:

   - Write clean, well-structured, and maintainable code.
   - Follow best practices and adhere to the React and TypeScript coding conventions.
   - Pay attention to code readability, modularity, and performance.

3. Test your code:

   - Run the application and test the stopwatch functionality to ensure it works correctly.
   - Verify that the stopwatch starts, stops, resets, and records laps as expected.

4. Code documentation:

   - Document your code by adding comments and explanatory notes where necessary.
   - Provide clear explanations of the implemented functionality and any important details.

5. Version control:

   - Use Git for version control. Commit your changes regularly and push them to a branch in your forked repository.

6. Create a Pull Request:
   - Once you have completed the project goals, create a pull request to merge your changes into the main repository.
   - Provide a clear description of the changes made and any relevant information for the code review.

## Getting Started

To start working on the project, follow these steps:

1. Clone the repository to your local development environment.

2. Install the required dependencies by running npm install in the project directory.

3. Open the project in your preferred code editor.

4. Review the existing code in the src directory to understand the initial structure and component hierarchy.

5. Implement the stopwatch functionality by modifying the necessary components (App.tsx, Stopwatch.tsx, StopwatchButton.tsx).

6. Run the application using npm start and test the stopwatch functionality.

7. Commit your changes regularly and push them to a branch in your forked repository.

8. Once you have completed the project goals, create a pull request to merge your changes into the main repository.

## Resources

Here are some resources that may be helpful during your work on this project:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official documentation for TypeScript, offering guidance on TypeScript features and usage.

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Explore React Testing Library, a popular testing library for React applications.

## Shopify Summer 2024 Intern Challenge

## Contents
1. [Usage](#usage)
2. [Local Installation](#local-installation)
3. [Quick Run](#quick-run)
4. [Run Test Cases](#run-test-cases)
5. [Additional Features](#additional-features)
6. [Reflection](#reflection)
7. [Resources](#resources)
8. [Next Steps](#next-steps)

## Usage
There are six simple actions that you can do to use the stopwatch app.
The actions are as described below:
| Action | Description |
|--------|-------------|
| Start | Click this button to start the stopwatch. You can only start it when the time is 00:00:00. |
| Stop | Click this button to stop the stopwatch and set the time back to 00:00:00. |
| Pause | Click this button when the stopwatch is running to pause the time. |
| Resume | Click this button when the stopwatch is paused to continue the timer running from when you paused it. |
| Reset | Click this button at any time after the stopwatch has started to reset the time to 00:00:00 and remove all lap entries. |
| Lap | Click this button when the stopwatch is running to lap the time. You can see the lapped time in the lap entries below. You can only lap when the stopwatch is active. |

All of these actions have been implemented as methods in (`src/StopWatch.tsx`). The start and stop buttons use the same method. The resume and pause buttons share a method too. The reset and lap buttons have their respective methods.

### Video of Usage

https://github.com/kishorpandya2210/eng-intern-assessment-react-native/assets/77642092/b1affa59-2ecd-4347-97c4-f9c8fd21500a


## Local Installation

### Prerequisites:
- Require one of the following emulators:
  - An Android emulator with Android 6.0 (API 23) or newer. Works best with Android 13.0 (API 33)
  - An iOS (iPhone) emulator with iOS 13.4 or newer.
  - A smartphone running either of the above mentioned OS with the Expo Go app installed on it.
- NodeJS.
- JDK if you are using the Android emulator.
- clone by the repo by running (`git clone https://github.com/kishorpandya2210/eng-intern-assessment-react-native.git`).

### Generate Dev Build
1. run `cd eng-intern-assessment-react-native` to enter the project directory.
2. run `npm i` or `npm install` to download all the dependencies required by the project.
3. run `npm start` to run the project using Expo Go.
4. press `a` to run it on your Android emulator or `i` to run it on the iOS emulator. You can also scan the QR code to run it on your own device (make sure your device and laptop are connected to the same local network).

## Quick Run
- Download the Expo Go app on your device
  - [For Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US&pli=1)
  - [For iOS](https://apps.apple.com/us/app/expo-go/id982107779)
- For Android Scan the QR code below:
- ![AndroidPreview2](https://github.com/kishorpandya2210/eng-intern-assessment-react-native/assets/77642092/0994aee7-3a3e-4162-9325-b6c91f67e9e3)
- For iOS Scan the QR code below:
- ![iOSPreview2](https://github.com/kishorpandya2210/eng-intern-assessment-react-native/assets/77642092/540b334a-b5b0-4313-9e5e-75dbd10b7e14)


## Run Test Cases
With the same prerequisites for local installation as described [above](#local-installation):
1. run `npm test` in the root directory of the project.

Validated results from test cases:

![TestPassImage](https://github.com/kishorpandya2210/eng-intern-assessment-react-native/assets/77642092/5d3d1681-9f32-4554-b2e4-77990d2e144a)

### Note About Test Cases
I have modified test case number 2,3, and 4.
1. In the second test case, I added jest fake timers to simulate the passage of time, otherwise the test would click the start and stop buttons instantly which resulted in the start and stop time being the same. I also added the '.props.children' keys to get the actual time string from the ReactTestInstance that was being returned by the 'getByText' function. Then I compared it with the original time before starting instead of checking for the text to be null, thus making this test more robust by making sure the start and stop times were different.
2. In the third test case, I added jest fake timers to simulate the passage of time, otherwise the test would click the start, resume, and pause buttons instantly which resulted in the resume and pause time being the same. I also added the '.props.children' keys to get the actual time string from the ReactTestInstance that was being returned by the 'getByText' function. Then I compared it with the original time before starting instead of checking for the text to be null, thus making this test more robust by making sure the pause and resume times were different.
3. In the fourth test case, I added jest fake timers to simulate the passage of time, otherwise the test would click the lap button twice instantly. I also added the '.props.children' keys to get the actual time string from the ReactTestInstance that was being returned by the 'getByText' function. I also made use of the 'toMatch' function instead of the 'toContainElement' function, since that requires a new library. 'toMatch' also allows me to compare the strings of the lap times. Instead of the 'getByText' I used the 'getAllByText' function so that it won't throw an error if it sees multiple '00:00:00' format texts. (One will always be present because of the main stopwatch)


## Additional features:
1. Hosted the app on Expo's app store. I learned a new way to host an app that can save time and money as I did not have to host on the Play Store or App Store.
2. Made the UI very user-friendly. The UI is very similar to the stopwatch UI on the iPhone's clock app. Thus the user will be able to pick it up easily.

## Reflection
### Biggest Challenges
1. This was my first time working with react native specifically. This created a learning curve that I had to overcome, but my experience with other frameworks like React and Flutter made this learning curve easier.
2. I chose the HH:MM:SS format instead of the MM:SS:MS format because to use milliseconds accurately, we have to use the system time instead of the setInterval function (like in my current application). I chose my implementation because, after some research online, I discovered that the system time can change if a user travels from one timezone to another or if the daylight savings time switch happens. A change in the system time can cause the stopwatch to display inaccurate time. Using the setInterval function came with its own disadvantages too as if you set an interval of less than 100 ms, the accuracy of the stopwatch is lost. Making this choice was difficult.
3. It was confusing to understand how the app should be implemented since the instructions sometimes contradicted what was in the test cases. My implementation is my version of how I thought the app should be implemented after looking at the instructions and the test cases.

### Key Takeaways
1. React Native - This project forced me to learn React Native. I noticed a lot of similarities between React and React Native. I also realized that Flutter has a different mechanism for doing things under the hood compared to React Native.
2. Testing - This project forced me to learn a lot of new Jest testing functions that I had never used before. Especially the Jest fake timer.
3. Hosting - I always believed to host an app I would have to publish it to either the Play Store or the App Store, working with Expo Go showed me that there are other ways to host apps too.

## Resources
Here are some resources that may be helpful during your work on this project:

- [React Native Doc](https://reactnative.dev/docs/environment-setup) - Official documentation to setup the development environment.

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official documentation for TypeScript, offering guidance on TypeScript features and usage.

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Explore React Testing Library, a popular testing library for React applications.

## Next Steps
1. Build a pipeline to create a workflow where an approved PR can be merged into the deployment branch, triggering the hosted app to rebuild.
2. Add more tests to the test suite to ensure the robustness of the application.
3. Host the app in the Apple App Store and Google Play Store.

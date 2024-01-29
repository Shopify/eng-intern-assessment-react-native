# Considerations

- The given `records and displays lap time` test was having a lot of issues, incl. the usage of `toContainElement()` as it's meant for web DOM elements rather than React Native components -> Checked for existence instead
- Given tests' usage of `.textContent` does not seem to work anymore -> Used `.props.children` instead
- Wrapped fire events that caused state changed with `act()`
  - However, I acknowledge that the fire event for pressing the "Lap" button is still triggering a warning (albeit being wrapped)

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import StopWatch from './src/StopWatch';
import theme from './src/theme';
import Box from './src/Box';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box backgroundColor='mainBackground' width='100%' height='100%'>
        <SafeAreaView>
          <StopWatch/>
          <StatusBar style="auto" />
        </SafeAreaView>
      </Box>
    </ThemeProvider>

  );
}

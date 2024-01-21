import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import StopWatch from './src/StopWatch';
import theme from './src/theme';
import Box from './src/Box';
import Text from './src/Text';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box backgroundColor='mainBackground' width='100%' height='100%'>
        <SafeAreaView>
          <Text textAlign='center' padding='m'>StopWatchify</Text>
          <StopWatch/>
          <StatusBar style="auto" />
        </SafeAreaView>
      </Box>
    </ThemeProvider>

  );
}

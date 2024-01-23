import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { RenderOptions, render as rntlRender } from '@testing-library/react-native';
import theme from '../theme';



function render(ui: React.ReactElement, opts?: RenderOptions) {
    return rntlRender(ui, {
           wrapper: ({ children }) => (
                  <ThemeProvider theme={theme}>
                     {children}
                  </ThemeProvider>
           ),
       ...opts},
    )};


export * from '@testing-library/react-native';
export {render};
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import { PaperProvider } from 'react-native-paper';
import { AxiosProvider } from './src/contexts/AxiosContext';

export default function App() {
  return (
    <Provider store={store}>
      <AxiosProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </AxiosProvider>
    </Provider>
  );
}
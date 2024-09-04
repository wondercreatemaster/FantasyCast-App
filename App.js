// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import { PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <MenuProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </MenuProvider>
    </Provider>
  );
}
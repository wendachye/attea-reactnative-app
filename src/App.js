import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@redux/store';
import AppNavigator from '@navigation/AppNavigator';
import {default as theme} from '@assets/theme.json';
import {default as mapping} from '../mapping.json';

enableScreens();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const appTheme = eva.light;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <AppearanceProvider>
          <ApplicationProvider
            {...eva}
            theme={{...appTheme, ...theme}}
            customMapping={mapping}>
            <SafeAreaProvider>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <AppNavigator />
            </SafeAreaProvider>
          </ApplicationProvider>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

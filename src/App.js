import React from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet, AsyncStorage } from 'react-native';
import Navigation from './navigation';

import { AppContextProvider } from './context';
import { firebaseTempFixe } from './helpers';

// Do not remove. a temporary fix for firebase-js.
firebaseTempFixe();

export default function App() {
  React.useEffect(() => {
    const checkForeUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // ... notify user of update ...
          await Updates.reloadAsync();
        }
      } catch (e) {
        // handle or log error
      }
    };
    checkForeUpdate();
  }, []);

  return (
    <AppContextProvider>
      <Navigation />
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

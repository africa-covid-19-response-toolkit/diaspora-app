import React from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import Navigation from './navigation';

/**
 * Temporary firestore issue fix
 */

import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

window.addEventListener = (x) => x;

// End of fix

import eng from './localization/eng/translation.json';
import amh from './localization/amh/translation.json';
import orm from './localization/orm/translation.json';
import tig from './localization/tig/translation.json';

import { LocalizationContext } from './context/language';

i18n.fallbacks = true;
i18n.translations = { eng, amh, orm, tig };

// This will log 'en' for me, as I'm an English speaker

export default function App() {
  // TODO: Add language picker.
  const [locale, setLocale] = React.useState('amh');
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

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
    <LocalizationContext.Provider value={localizationContext}>
      <Navigation />
    </LocalizationContext.Provider>
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

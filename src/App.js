import React from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import Navigation from './navigation';

import eng from './localization/eng/translation.json';
import amh from './localization/amh/translation.json';
import orm from './localization/orm/translation.json';
import tig from './localization/tig/translation.json';

import { LocalizationContext } from './context/language';

i18n.fallbacks = true;
i18n.translations = { eng, amh, orm, tig };

// Do not remove. a temporary fix for firebase-js.
firebaseTempFixe();

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

/**
 * Temporary firestore issue fix
 * https://github.com/firebase/firebase-js-sdk/issues/2991
 * https://github.com/facebook/react-native/issues/12981
 * Remove if firebase version is above 7.14.2
 */

import { decode, encode } from 'base-64';

const firebaseTempFixe = () => {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }

  window.addEventListener = (x) => x;
  const _setTimeout = global.setTimeout;
  const _clearTimeout = global.clearTimeout;
  const MAX_TIMER_DURATION_MS = 60 * 1000;
  if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();
      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timerFix[id]) {
            return;
          }
          delete timerFix[id];
          fn(...args);
        });
        return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time;
        const id = '_lt_' + Object.keys(timerFix).length;
        runTask(id, fn, ttl, args);
        return id;
      }
      return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id) => {
      if (typeof id === 'string' && id.startWith('_lt_')) {
        _clearTimeout(timerFix[id]);
        delete timerFix[id];
        return;
      }
      _clearTimeout(id);
    };
  }
};

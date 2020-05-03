/**
 * Temporary firestore issue fix
 * https://github.com/firebase/firebase-js-sdk/issues/2991
 * https://github.com/facebook/react-native/issues/12981
 * Remove if firebase version is above 7.14.2
 */
import { Platform, YellowBox } from 'react-native';
import { decode, encode } from 'base-64';

export const firebaseTempFixe = () => {
  YellowBox.ignoreWarnings(['Setting a timer']);
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }

  window.addEventListener = (x) => x;

  //   const _setTimeout = global.setTimeout;
  //   const _clearTimeout = global.clearTimeout;
  //   const MAX_TIMER_DURATION_MS = 60 * 1000;
  //   if (Platform.OS === 'android') {
  //     // Work around issue `Setting a timer for long time`
  //     // see: https://github.com/firebase/firebase-js-sdk/issues/97
  //     const timerFix = {};
  //     const runTask = (id, fn, ttl, args) => {
  //       const waitingTime = ttl - Date.now();
  //       if (waitingTime <= 1) {
  //         InteractionManager.runAfterInteractions(() => {
  //           if (!timerFix[id]) {
  //             return;
  //           }
  //           delete timerFix[id];
  //           fn(...args);
  //         });
  //         return;
  //       }

  //       const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
  //       timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  //     };

  //     global.setTimeout = (fn, time, ...args) => {
  //       if (MAX_TIMER_DURATION_MS < time) {
  //         const ttl = Date.now() + time;
  //         const id = '_lt_' + Object.keys(timerFix).length;
  //         runTask(id, fn, ttl, args);
  //         return id;
  //       }
  //       return _setTimeout(fn, time, ...args);
  //     };

  //     global.clearTimeout = (id) => {
  //       if (typeof id === 'string' && id.startWith('_lt_')) {
  //         _clearTimeout(timerFix[id]);
  //         delete timerFix[id];
  //         return;
  //       }
  //       _clearTimeout(id);
  //     };
  //   }
};

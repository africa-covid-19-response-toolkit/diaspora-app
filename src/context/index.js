import React, { useReducer, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';

import eng from '../localization/eng/translation.json';
import amh from '../localization/amh/translation.json';
import orm from '../localization/orm/translation.json';
import tig from '../localization/tig/translation.json';

i18n.fallbacks = 'eng';
i18n.translations = { eng, amh, orm, tig };

const initialState = {
  locale: '',
  user: {
    concent: false,
    location: {
      zip: '',
      address: {},
    },
    gender: null,
    age: null,
    ethnicity: null,
  },
  userResponse: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOCALE_CHANGED':
      return { ...state, locale: action.payload };
    case 'SET_USER_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'SET_USER_RESPONSE':
      return {
        ...state,
        userResponse: { ...state.userResponse, ...action.payload },
      };

    default:
      return initialState;
  }
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const actions = {
    setLocale: async (locale) => {
      await AsyncStorage.setItem('locale', locale);
      return dispatch({ type: 'LOCALE_CHANGED', payload: locale });
    },
    setUserProfile: (value) =>
      dispatch({ type: 'SET_USER_PROFILE', payload: value }),
    setUserResponse: (value) =>
      dispatch({ type: 'SET_USER_RESPONSE', payload: value }),
  };

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) =>
        i18n.t(scope, { locale: state.locale, ...options }),
      locale: state.locale,
    }),
    [state.locale]
  );

  return (
    <AppContext.Provider
      value={{ state, dispatch, ...localizationContext, ...actions }}
    >
      {children}
    </AppContext.Provider>
  );
};

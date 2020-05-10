import React, { useReducer, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';

import eng from '../localization/eng/translation.json';
import amh from '../localization/amh/translation.json';
import orm from '../localization/orm/translation.json';
import tig from '../localization/tig/translation.json';

i18n.fallbacks = true;
i18n.translations = { eng, amh, orm, tig };

const initialState = {
  locale: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOCALE_CHANGED':
      return { ...state, locale: action.payload };

    default:
      return initialState;
  }
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setLocale = async (locale) => {
    await AsyncStorage.setItem('locale', locale);
    dispatch({ type: 'LOCALE_CHANGED', payload: locale });
  };

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) =>
        i18n.t(scope, { locale: state.locale, ...options }),
      locale: state.locale,
      setLocale,
    }),
    [state.locale]
  );

  return (
    <AppContext.Provider value={{ state, dispatch, ...localizationContext }}>
      {children}
    </AppContext.Provider>
  );
};

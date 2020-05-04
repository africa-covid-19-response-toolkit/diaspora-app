import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Picker, AsyncStorage } from 'react-native';
import { LocalizationContext } from '../context/language';

const languages = [
  { name: 'English', locale: 'eng', code: 'EN' },
  { name: 'አማርኛ', locale: 'amh', code: 'AM' },
  { name: 'Afaan Oromoo', locale: 'orm', code: 'OR' },
  { name: 'ትግሪኛ', locale: 'tig', code: 'TG' },
];

const LanguageSelect = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const { locale, setLocale } = useContext(LocalizationContext);

  useEffect(() => {
    setSelectedValue(locale);
  }, [locale]);

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setLocale(itemValue);
        }}
      >
        {languages.map((language) => (
          <Picker.Item
            key={language.locale}
            label={language.name}
            value={language.locale}
          />
        ))}
      </Picker>
    </View>
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({});

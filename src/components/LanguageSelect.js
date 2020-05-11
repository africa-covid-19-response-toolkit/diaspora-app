import React, { useState, useEffect, useContext, Children } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  AsyncStorage,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome5';
import { find } from 'lodash';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import { AppContext } from '../context';
const languages = [
  { name: 'English', locale: 'eng', code: 'EN' },
  { name: 'አማርኛ', locale: 'amh', code: 'አማ' },
  { name: 'Afaan Oromoo', locale: 'orm', code: 'OR' },
  { name: 'ትግሪኛ', locale: 'tig', code: 'ትግ' },
];

// const DEFAULT_LOCALE = 'eng';

const LanguageSelect = () => {
  const { locale, setLocale } = React.useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedValue(locale);
  }, [locale]);

  const languageCode = selectedValue
    ? find(languages, { locale: selectedValue }).code
    : '';

  if (Platform.OS === 'android' || Platform.OS === 'ios')
    return (
      <>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ marginRight: 5, fontSize: 16 }}>{languageCode}</Text>
          <Icon name="caret-down" size={15} />
        </TouchableOpacity>
        <Modal isVisible={modalVisible}>
          <View style={styles.modalContent}>
            {languages.map((language) => {
              return (
                <View key={language.locale} style={{ alignSelf: 'flex-start' }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: 'white',
                      borderColor: 'white',
                    }}
                    title={`${language.name} (${language.code})`}
                    checked={selectedValue === language.locale}
                    onPress={() => {
                      setModalVisible(false);
                      setLocale(language.locale);
                    }}
                  />
                </View>
              );
            })}
          </View>
        </Modal>
      </>
    );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setLocale(itemValue);
        }}
      >
        {languages.map((language) => (
          <Picker.Item
            key={language.locale}
            label={language.code}
            value={language.locale}
          />
        ))}
      </Picker>
    </View>
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

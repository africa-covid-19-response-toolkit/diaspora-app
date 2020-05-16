import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import LanguageSelect from '../LanguageSelect';
import { AppContext } from '../../context';

const Welcome = ({ navigation }) => {
  const { t } = React.useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text>{t('WELCOME_HEADER')}</Text>
      <View style={styles.languageWrapper}>
        <Text>{t('WELCOME_SELECT_LANGUAGE')}</Text>
        <LanguageSelect />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title={t('ACTION_BUTTON_CONTINUE')}
          onPress={() => navigation.navigate('Consent')}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  languageWrapper: { margin: 30 },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonStyle: { borderRadius: 19, padding: 20 },
  buttonText: { fontSize: 20 },
});

import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { AppContext } from '../../context';

const Consent = ({ navigation }) => {
  const { setUserProfile, t } = React.useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text>Consent</Text>

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title={t('ACTION_BUTTON_CONSENT')}
          onPress={() => {
            setUserProfile({ concent: true });
            navigation.navigate('Location');
          }}
        />
      </View>
    </View>
  );
};

export default Consent;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonStyle: { borderRadius: 19, padding: 20 },
  buttonText: { fontSize: 20 },
});

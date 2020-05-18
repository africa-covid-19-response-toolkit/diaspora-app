import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { AppContext } from '../../context';

const JOBS_URL = 'https://bit.ly/covid19-contact-tracers';

const Jobs = () => {
  const { t } = React.useContext(AppContext);
  useEffect(() => {
    // openBrowser();
  }, []);

  const openBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(JOBS_URL);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonText}
        title={t('ACTION_JOBS_REGISTER')}
        onPress={openBrowser}
      />
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

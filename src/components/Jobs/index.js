import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { AppContext } from '../../context';

const JOBS_URL = 'https://bit.ly/covid19-contact-tracers';
const TRAINING_URL =
  'https://www.coursera.org/learn/covid-19-contact-tracing?edocomorp=covid-19-contact-tracing';

const Jobs = () => {
  const { t } = React.useContext(AppContext);

  const openBrowser = async (url) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>What is Contact Tracing?</Text>

        <Text>
          Contact tracing is the process of identification of persons who may
          have come into contact with an infected person and subsequent
          collection of further information about these contacts. To learn more
          about contact tracing, you can complete the COVID-19 Contact Tracing
          below.
        </Text>

        <Button
          title="Free Contact Tracing Course"
          type="clear"
          onPress={() => openBrowser(TRAINING_URL)}
        />
      </View>
      <Button
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonText}
        title={t('ACTION_JOBS_REGISTER')}
        onPress={() => openBrowser(JOBS_URL)}
      />
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

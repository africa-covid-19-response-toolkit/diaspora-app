import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { AppContext } from '../../context';

const Instruction = ({ navigation }) => {
  const { t } = React.useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text>Instruction</Text>

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title={t('ACTION_LETS_DO_IT')}
          onPress={() => navigation.navigate('Consent')}
        />
      </View>
    </View>
  );
};

export default Instruction;

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

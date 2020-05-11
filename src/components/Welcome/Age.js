import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../../context';

const Age = ({ navigation }) => {
  const [age, setAge] = useState(null);
  const { setUserProfile, t } = React.useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>{t('TITLE_USER_AGE')}</Text>
      </View>

      <Input
        containerStyle={styles.containerStyle}
        value={age}
        type="number"
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        placeholder="Enter your age...."
        keyboardType="numeric"
        onChangeText={(value) => {
          setAge(value);
        }}
      />

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          disabled={!age}
          title={t('ACTION_BUTTON_NEXT')}
          onPress={() => {
            setUserProfile({ age });
            navigation.navigate('Sex');
          }}
        />
      </View>
    </View>
  );
};

export default Age;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 16,
  },
  containerStyle: { paddingHorizontal: 0 },
  inputContainerStyle: { borderBottomWidth: 0 },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    padding: 20,
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonStyle: { borderRadius: 19, padding: 20 },
  buttonText: { fontSize: 20 },
});

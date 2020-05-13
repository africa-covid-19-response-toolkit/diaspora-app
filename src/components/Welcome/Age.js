import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../../context';

const Age = ({ navigation }) => {
  const [age, setAge] = useState('');
  const { setUserProfile, t } = React.useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>{t('TITLE_USER_AGE')}</Text>
      </View>

      <Input
        containerStyle={styles.containerStyle}
        value={age}
        maxLength={3}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        placeholder={t('PLACE_HOLDER_AGE')}
        keyboardType="number-pad"
        onChangeText={(value) => {
          // Limit characters.
          if (value.length > 3) {
            return;
          }

          // When input is cleared.
          if (!value) {
            setAge(value);
            return;
          }

          // Ignore non-numeric characters.
          const regex = /[0-9]/;
          if (!regex.test(value)) return;

          setAge(value);
        }}
      />

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          disabled={age.length < 1 || age.length > 3}
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

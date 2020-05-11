import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from '@expo/vector-icons/FontAwesome5';
import { get } from 'lodash';
import * as Location from 'expo-location';

import { AppContext } from '../../context';

const LocationButton = ({ onSelect, onError }) => {
  const requestPermission = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      onError('Permission to access location was denied');
      requestPermission();
    }

    let location = await Location.getCurrentPositionAsync({});
    onSelect(location);
  };

  return (
    <TouchableOpacity onPress={async () => await requestPermission()}>
      <Icon name="location-arrow" color="white" size={30} />
    </TouchableOpacity>
  );
};

const UserLocation = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState({ zip: '', coords: {} });
  const { setUserProfile, t } = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.titleStyle}>{t('TITLE_USER_LOCATION')}</Text>
        <Text>{t('TITLE_USER_LOCATION_DESCRIPTION')}</Text>
      </View>

      <Input
        containerStyle={styles.containerStyle}
        value={userLocation.zip}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        placeholder={t('PLACE_HOLDER_ZIP')}
        rightIcon={
          <LocationButton
            onSelect={async (location) => {
              const coords = location.coords || {};

              if (coords && coords.latitude && coords.longitude) {
                const address = await Location.reverseGeocodeAsync(coords);
                if (address && address.length && address[0]) {
                  setUserLocation({
                    zip: get(address[0], 'postalCode'),
                    coords,
                  });
                }
              }
            }}
            onError={(error) => console.log(error)}
          />
        }
        onChangeText={(value) =>
          setUserLocation({ ...userLocation, zip: value })
        }
      />

      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          disabled={!userLocation.zip}
          title={t('ACTION_BUTTON_NEXT')}
          onPress={() => {
            setUserProfile({ location: userLocation });
            navigation.navigate('Age');
          }}
        />
      </View>
    </View>
  );
};

export default UserLocation;

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
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 20,
  },
  rightIconContainerStyle: {
    backgroundColor: 'blue',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    height: Platform.OS === 'ios' ? 64 : 70,
    width: Platform.OS === 'ios' ? 64 : 70,
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

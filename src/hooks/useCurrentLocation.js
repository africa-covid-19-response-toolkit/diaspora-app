import * as Location from 'expo-location';
import ZIPCodes from 'zipcodes';

const useCurrentLocation = () => {
  const currentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      onError('Permission to access location was denied');
      currentLocation();
    }

    try {
      const location = await Location.getCurrentPositionAsync({});

      const coords = location.coords || {};

      if (coords && coords.latitude && coords.longitude) {
        const address = ZIPCodes.lookupByCoords(
          coords.latitude,
          coords.longitude
        );

        return { ...address, ...coords };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { currentLocation };
};

export default useCurrentLocation;

import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset';

const SplashScreen = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        await cacheResourcesAsync();
        setIsReady(true);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  const cacheResourcesAsync = () => {
    const images = [require('../assets/splash.png')];
    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    return Promise.all(cacheImages);
  };

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          flex: 1,
          resizeMode: 'contain',
          width: undefined,
          height: undefined,
        }}
        source={require('./assets/splash.png')}
        onLoadEnd={() => {
          // wait for image's content to fully load [`Image#onLoadEnd`] (https://facebook.github.io/react-native/docs/image#onloadend)
          console.log('Image#onLoadEnd: hiding SplashScreen');
          SplashScreen.hide(); // Image is fully presented, instruct SplashScreen to hide
        }}
        fadeDuration={0} // we need to adjust Android devices (https://facebook.github.io/react-native/docs/image#fadeduration) fadeDuration prop to `0` as it's default value is `300`
      />
    </View>
  );
};

export default SplashScreen;

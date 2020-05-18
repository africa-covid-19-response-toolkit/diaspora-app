import React from 'react';
import {
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from '../api/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Components
import Loading from '../components/Loading';
import SelfCheckScreen from '../screens/SelfCheckScreen';

import LanguageSelect from '../components/LanguageSelect';

// Screens
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FullScreen from '../screens/FullScreen';
import Welcome from '../components/Welcome';
import Instruction from '../components/Welcome/Instruction';
import Consent from '../components/Welcome/Consent';
import UserLocation from '../components/Welcome/UserLocation';
import Age from '../components/Welcome/Age';
import Sex from '../components/Welcome/Sex';
import Ethnicity from '../components/Welcome/Ethnicity';
import { AppContext } from '../context';
import JobsScreen from '../screens/JobsScreen';

const DEFAULT_LOCALE = 'eng';

const headerOptions = (props) => ({
  headerTitle: null,
  // headerTitle: () => (
  //   <TouchableOpacity onPress={() => auth().signOut()}>
  //     <Text>Temp Sign out REMOVE ME!!!</Text>
  //   </TouchableOpacity>
  // ),
  headerStyle: { backgroundColor: '#fdd30e' },
  headerLeft: () => (
    <View
      style={{
        marginHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
      }}
    >
      <Image
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
        source={require('../assets/ecrt_logo.png')}
      />
    </View>
  ),
  headerRight: () => (
    <View
      style={{
        marginHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
      }}
    >
      <LanguageSelect />
    </View>
  ),
});

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerTitle: null,
      headerTransparent: true,
      headerShown: true,
      headerStyle: { borderBottomWidth: 0 },
    }}
  >
    <AuthStack.Screen name="Welcome" component={Welcome} />
    <AuthStack.Screen name="Instruction" component={Instruction} />
    <AuthStack.Screen name="Consent" component={Consent} />
    <AuthStack.Screen name="Location" component={UserLocation} />
    <AuthStack.Screen name="Age" component={Age} />
    <AuthStack.Screen name="Sex" component={Sex} />
    <AuthStack.Screen name="Ethnicity" component={Ethnicity} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={(props) => headerOptions(props)}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const SelfCheckStack = createStackNavigator();
const SelfCheckStackScreen = () => (
  <SelfCheckStack.Navigator screenOptions={(props) => headerOptions(props)}>
    <SelfCheckStack.Screen name="check" component={SelfCheckScreen} />
  </SelfCheckStack.Navigator>
);

const StatsStack = createStackNavigator();
const StatsStackScreen = () => (
  <StatsStack.Navigator screenOptions={(props) => headerOptions(props)}>
    <StatsStack.Screen name="Stats" component={StatsScreen} />
  </StatsStack.Navigator>
);

const FullScreenStack = createStackNavigator();
const FullScreenStackScreen = () => (
  <FullScreenStack.Navigator>
    <FullScreenStack.Screen name="FullScreen" component={FullScreen} />
  </FullScreenStack.Navigator>
);

const JobsStack = createStackNavigator();
const JobsStackStackScreen = () => (
  <JobsStack.Navigator screenOptions={(props) => headerOptions(props)}>
    <JobsStack.Screen name="Jobs" component={JobsScreen} />
  </JobsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => {
  const { t } = React.useContext(AppContext);
  return (
    <AppTabs.Navigator
      initialRouteName="Check"
      tabBarOptions={{
        activeTintColor: '#007771',
        inactiveTintColor: 'black',
        tabStyle: { backgroundColor: '#fdd30e' },
      }}
    >
      <AppTabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('TABS_HOME'),
          tabBarIcon: (props) => (
            <Ionicons name="ios-home" size={props.size} color={props.color} />
          ),
        }}
      />
      <AppTabs.Screen
        name="Check"
        component={SelfCheckStackScreen}
        options={{
          tabBarLabel: t('TABS_CHECK'),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="stethoscope"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Stats"
        component={StatsStackScreen}
        options={{
          tabBarLabel: t('TABS_STATS'),
          tabBarIcon: (props) => (
            <Ionicons name="ios-stats" size={props.size} color={props.color} />
          ),
        }}
      />
      <AppTabs.Screen
        name="Jobs"
        component={JobsStackStackScreen}
        options={{
          tabBarLabel: t('TABS_JOBS'),
          tabBarIcon: (props) => (
            <Ionicons
              name="ios-briefcase"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </AppTabs.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const { locale, setLocale } = React.useContext(AppContext);
  const [state, setState] = React.useState({ isLoading: true, user: null });

  // Handle user state changes
  const onAuthStateChanged = (authUser) => {
    if (authUser) {
      setState({ isLoading: false, user: authUser });
    } else {
      // No user is signed in.
      setState({ isLoading: false, user: null });
    }
  };

  React.useEffect(() => {
    const loadUserLocale = async () => {
      const userLocale = await AsyncStorage.getItem('locale');
      if (userLocale) {
        setLocale(userLocale);
      } else {
        setLocale(DEFAULT_LOCALE);
      }
    };
    loadUserLocale();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
      mode="modal"
    >
      {state.isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : state.user ? (
        <RootStack.Screen name="AppTabsScreen" component={AppTabsScreen} />
      ) : (
        <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
      <RootStack.Screen
        name="FullScreen"
        component={FullScreenStackScreen}
        options={{ animationEnabled: true }}
      />
    </RootStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);

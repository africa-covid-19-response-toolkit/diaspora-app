import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from '../api/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Components
import Loading from '../components/Loading';

// Screens
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FullScreen from '../screens/FullScreen';
import SelfCheckScreen from '../screens/SelfCheckScreen';
import { LocalizationContext } from '../context/language';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const SelfCheckStack = createStackNavigator();
const SelfCheckStackScreen = () => (
  <SelfCheckStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <SelfCheckStack.Screen name="check" component={SelfCheckScreen} />
  </SelfCheckStack.Navigator>
);

const StatsStack = createStackNavigator();
const StatsStackScreen = () => (
  <StatsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <StatsStack.Screen name="Stats" component={StatsScreen} />
  </StatsStack.Navigator>
);

const FullScreenStack = createStackNavigator();
const FullScreenStackScreen = () => (
  <FullScreenStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <FullScreenStack.Screen name="FullScreen" component={FullScreen} />
  </FullScreenStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => {
  const { t } = React.useContext(LocalizationContext);
  return (
    <AppTabs.Navigator>
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
    </AppTabs.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
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

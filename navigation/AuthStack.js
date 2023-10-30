import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoginScreen from "../Screens/LoginScreen"
import OnBoardingScreen from '../Screens/OnBoardingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  
    GoogleSignin.configure({
      webClientId: "458013392894-38h3nqnvulomh2vsq6i2is66tt42ij7q.apps.googleusercontent.com",
    });

  
  }, []);

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'LoginScreen';
  }
   
  return (
    <Stack.Navigator initialRouteName={routeName} screenOptions={{ headerShown: false,animation:"fade" }}>
    <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>
  )
}
export default AuthStack
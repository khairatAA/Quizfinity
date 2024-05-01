import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import { getItem } from '../utilis/asyncStorage';
import { View, Text } from 'react-native';
import ButtomTab from '../ButtonTab/ButtomTab';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null || Boolean);
  const [showLogIn, setShowLogIn] = useState(null || Boolean);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onboarded = await getItem({ key: 'onboarded' });
        setShowOnboarding(onboarded === '1' ? false : true);

        const isLoggedIn = await getItem({ key: 'loggedIn' });
        console.log('isLoggedIn: ', isLoggedIn);
        
        setShowLogIn(isLoggedIn === '1' ? false : true);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  if (showOnboarding === null) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showLogIn ? 'Login' : 'ButtomTab'}>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="LogIn" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="ButtomTab" options={{ headerShown: false }} component={ButtomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

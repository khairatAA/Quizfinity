import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
// import { getItem } from '../utilis/asyncStorage';
import { View, Text } from 'react-native';
import ButtomTab from '../ButtonTab/ButtomTab';
import QuizLevels from '../screens/QuizLevels';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const isLoggedIn = true; // Set this to the actual value you want to use
  const initialRoute = isLoggedIn ? 'ButtomTab' : 'Onboarding';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="LogIn" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="ButtomTab" options={{ headerShown: false }} component={ButtomTab} />
        <Stack.Screen name="QuizLevels" options={{ headerShown: false }} component={QuizLevels} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

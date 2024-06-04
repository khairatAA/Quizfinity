import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ButtomTab from '../ButtonTab/ButtomTab';
import QuizLevels from '../screens/QuizLevels';
import QuizInstructionScreen from '../screens/QuizInstructionScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import { Text } from 'react-native';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const onboarded = await AsyncStorage.getItem('onboarded');
      setIsFirstTimeUser(onboarded !== '1');
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      checkFirstTimeUser().then(() => {
        if (currentUser) {
          setInitialRoute('ButtomTab');
        } else if (isFirstTimeUser) {
          setInitialRoute('Onboarding');
        } else {
          setInitialRoute('LogIn');
        }
      });
    });

    return () => unsubscribe();
  }, [isFirstTimeUser]);

  if (initialRoute === null) {
    return <LoadingScreen />; // Optionally render a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="LogIn" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="ButtomTab" options={{ headerShown: false }} component={ButtomTab} />
        <Stack.Screen name="QuizLevels" options={{ headerShown: false }} component={QuizLevels} />
        <Stack.Screen name="QuizInstruction" options={{ headerShown: false }} component={QuizInstructionScreen} />
        <Stack.Screen name="QuizScreen" options={{ headerShown: false }} component={QuizScreen} />
        <Stack.Screen name="ResultScreen" options={{ headerShown: false }} component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

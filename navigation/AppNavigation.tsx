import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import ButtomTab from "../ButtonTab/ButtomTab";
import QuizLevels from "../screens/QuizLevels";
import QuizInstructionScreen from "../screens/QuizInstructionScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultsScreen from "../screens/ResultsScreen";
import { Text } from "react-native";
import LoadingScreen from "../screens/LoadingScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        currentUser.reload().then(() => {
          if (currentUser.emailVerified) {
            setInitialRoute("ButtomTab");
          } else {
            setInitialRoute("LogIn");
          }
          setLoading(false);
        });
      } else {
        setInitialRoute("Onboarding");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onIdTokenChanged((user) => {
      if (!user) {
        setInitialRoute("LogIn");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute || "Loading"}>
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="LogIn"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false }}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="UpdatePassword"
          options={{ headerShown: false }}
          component={UpdatePasswordScreen}
        />
        <Stack.Screen
          name="ButtomTab"
          options={{ headerShown: false }}
          component={ButtomTab}
        />
        <Stack.Screen
          name="QuizLevels"
          options={{ headerShown: false }}
          component={QuizLevels}
        />
        <Stack.Screen
          name="QuizInstruction"
          options={{ headerShown: false }}
          component={QuizInstructionScreen}
        />
        <Stack.Screen
          name="QuizScreen"
          options={{ headerShown: false }}
          component={QuizScreen}
        />
        <Stack.Screen
          name="ResultScreen"
          options={{ headerShown: false }}
          component={ResultsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigation from "./navigation/AppNavigation";
import { StatusBar } from 'expo-status-bar';

// Prevents the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load custom fonts using useFonts hook
  const [fontsLoaded, fontError] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });

  // Callback function to hide the splash screen when fonts are loaded or if there's an error
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If fonts are not loaded yet and there's no error, return null to render nothing
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // If fonts are loaded or there's an error, render the main application content
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>

      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

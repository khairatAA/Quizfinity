import { View, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import WelcomeHeader from '../components/HomeScreen/WelcomeHeader';
import UserRanking from '../components/HomeScreen/UserRanking';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <WelcomeHeader />
      <UserRanking />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: Colors.light.primary100,
    gap: 30,
  },
})

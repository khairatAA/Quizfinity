import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Badge, Cofetti } from '../assets/icons'

const AttemptsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.attempts}>
        <View style={styles.cofetti}>
          <Cofetti height={150} width='50%' />
          <Cofetti height={150} width='50%' />
        </View>
        <Badge height={200} width='100%'  />
        <View style={styles.text}>
          <Text>Congratulations</Text>
          <Text>
            You have successfully earned 200pt and your current rank stands at number 30.
          </Text>
          <Text>Keep Learning The Fun Way</Text>
        </View>
      </View>
    </View>
  )
}

export default AttemptsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: Colors.light.primary200,
    gap: 30,
  },
  cofetti:{
    flexDirection: 'row',
  },
  attempts: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
  }
})

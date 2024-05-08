import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Colors from '../constants/Colors'
import QuizLevelHeader from '../components/QuizLevel/QuizLevelHeader'
import LevelContainer from '../components/QuizLevel/LevelContainer'

const QuizLevels = ({ route }: any) => {
  return (
    <View style={styles.container}>
      {/* <SafeAreaView /> */}
      <StatusBar style='auto' />
      <QuizLevelHeader route={route} />
      <LevelContainer route={route} />
    </View>
  )
}

export default QuizLevels

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: Colors.light.primary200,
    gap: 30,
  }
})

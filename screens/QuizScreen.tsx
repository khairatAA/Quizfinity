import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import GameInterface from '../components/GameScreen/GameInterface'
import Colors from '../constants/Colors'
import GameHeader from '../components/GameScreen/GameHeader'
import GameUI from '../components/GameScreen/GameUI'

const QuizScreen = ({ route }: any) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <GameInterface route={route} />
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#614BF2',
  }
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Result from '../components/ResultScreen/Result'

const ResultsScreen = ({ route }: any) => {
  return (
    <View style={styles.container}>
      <Result route={route} />
    </View>
  ) 
}

export default ResultsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
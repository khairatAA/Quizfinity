import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import LeaderboardUI from '../components/LeaderBoard/LeaderboardUI'

const LeadershipBoard = () => {
  return (
    <View style={styles.container}>
      <LeaderboardUI />
    </View>
  )
}

export default LeadershipBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
})

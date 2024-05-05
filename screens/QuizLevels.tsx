import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const QuizLevels = () => {
    const navigation = useNavigation()

    const handleNavigationToHome = () => {
        navigation.goBack()
    }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>QuizLevels</Text>
      <TouchableOpacity onPress={handleNavigationToHome}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default QuizLevels
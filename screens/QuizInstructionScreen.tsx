import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import InstructionHeader from '../components/QuizInstruction/InstructionHeader'
import InstructionBody from '../components/QuizInstruction/InstructionBody'

const QuizInstructionScreen = ({ route }: any) => {
  return (
    <View style={styles.container}>
     <InstructionHeader route={route} />
     <InstructionBody route={route} />
    </View>
  )
}

export default QuizInstructionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        backgroundColor: Colors.light.primary200,
        gap: 30,
    }
})
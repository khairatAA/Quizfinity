import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Lost } from '../../assets/QuizInstruction/index'
import PrimaryButton from '../ui/PrimaryButton'

const InstructionBody = ({ route }: any) => {
    const { category, levelNumber } = route.params;
    const navigation = useNavigation()

    const handleStartQuiz = () => {
        // Navigate to the quiz screen passing category and level information
        navigation.navigate('QuizScreen', { category, levelNumber });
      };

  return (
    <View style={styles.container}>
        <ScrollView>
            <View>
                <Lost height={300} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Quiz Instructions</Text>
                <Text style={styles.instruction}>
                    Welcome to the Quiz! This quiz consists of multiple-choice questions.
                    You will have a limited time to answer each question.
                    Make sure to read each question carefully before selecting your answer.
                </Text>
                <PrimaryButton ButtonText='Start Quiz' onPress={handleStartQuiz} />
            </View>
      </ScrollView>
    </View>
  )
}

export default InstructionBody

const styles = StyleSheet.create({
    container: {
        gap: 30,
        paddingHorizontal: 20,
        flex: 1,
    },
    textContainer:{
        gap: 30
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 28,
        textAlign: 'center',
    },
    instruction: {
        fontSize: 18,
        fontFamily: 'OpenSans-Regular',
    },
})
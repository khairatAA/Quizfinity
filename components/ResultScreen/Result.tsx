import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import {FIREBASE_DB} from '../../firebaseConfig'
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'
import ResultsUI from './ResultsUI'

const Result = ({ route }: any) => {
    const navigation = useNavigation()
    const {
        category,
        levelNumber,
        score,
        correctAnswers,
        wrongAnswers,
        totalQuestions,
        timeUsed
    } = route.params;

    useEffect(() => {
        handleResultPress()
    }, []);

    const handleResultPress = async () => {
        const level = `level_${levelNumber}`
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
            const userId = user.uid; // Get the user ID
            const userDocRef = doc(FIREBASE_DB, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);
    
                if (userDocSnap.exists()) {
                    const categoryDocRef = doc(FIREBASE_DB, 'users', userId, 'game_categories', category);
                    const categoryDocSnap = await getDoc(categoryDocRef);
    
                    if (categoryDocSnap.exists()) {
                        const levelData = categoryDocSnap.data();
                        const currentScore = levelData[level] || 0;
                        const newScore = currentScore + score;
                        await updateDoc(categoryDocRef, { [level]: newScore });
                    } else {
                        // If the subcollection does not exist, create it and set the score for the corresponding level
                        await setDoc(categoryDocRef, { [level]: score });
                    }
                } else {
                    console.log('User document not found');
                }
            } else {
            console.log('No user is currently logged in');
            }
        } catch (error) {
            console.log(error); 
        }
    }

  return (
    <View style={styles.container}>
        <ResultsUI
        route={route}
        score={score}
        OnPressBack={() => {navigation.navigate('ButtomTab')}}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        timeUsed={timeUsed}
        totalQuestions={totalQuestions}
        />
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  })
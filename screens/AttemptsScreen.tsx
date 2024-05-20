import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Badge, Cofetti } from '../assets/icons'
import { FIREBASE_AUTH } from '../firebaseConfig'
import {FIREBASE_DB} from '../firebaseConfig'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const AttemptsScreen = () => {

  const [totalPoints, setTotalPoints] = useState(0);

  const handleScoreRetrieval = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(FIREBASE_DB, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const categoriesCollectionRef = collection(FIREBASE_DB, 'users', userId, 'game_categories');
          const categoriesSnapshot = await getDocs(categoriesCollectionRef);
          
          let totalScore = 0;

          categoriesSnapshot.forEach((doc) => {
            const categoryData = doc.data();
            
            Object.keys(categoryData).forEach((level) => {
              totalScore += categoryData[level];
            });
          });

          setTotalPoints(totalScore);
        } else {
          console.log('User document not found');
        }
      } else {
        console.log('No user is currently logged in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleScoreRetrieval()
    }, [])
  );

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
          <Text style={styles.congrats}>Congratulations!</Text>
          <Text style={styles.content}>
            You have earned <Text style={styles.emphasis}>{totalPoints} points</Text> and are currently ranked <Text style={styles.emphasis}>30th</Text> on the leaderboard.
          </Text>
          <Text style={styles.moto}>Keep Learning The Fun Way</Text>
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
    marginTop: 30,
    gap: 23
  },
  congrats: {
    color: '#614BF2',
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
  },
  content: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  moto: {
    color: '#614BF2',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
  emphasis: {
    color: '#614BF2',
    fontFamily: 'OpenSans-Bold',
  }
})

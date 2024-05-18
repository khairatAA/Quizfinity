import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Coins } from '../../assets/icons/index';
import Colors from '../../constants/Colors';
import { FIREBASE_AUTH } from '../../firebaseConfig'
import {FIREBASE_DB} from '../../firebaseConfig'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const UserRanking = () => {
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
      <View style={styles.rankingContainer}>
          <View style={[styles.ranking, styles.rightBorder]}>
          <Image source={require('../../assets/icons/cup.png')} style={styles.RankIcon} />
          <View>
              <Text style={styles.rankingText}>Ranking</Text>
              <Text style={styles.score}>000</Text>
          </View>
          </View>

          <View style={styles.ranking}>
          <Coins style={styles.PointsIcon} />
          <View>
              <Text style={styles.rankingText}>Points</Text>
              <Text style={styles.score}>{totalPoints}</Text>
          </View>
          </View>
      </View>
    </View>
  )
}

export default UserRanking

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    rankingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.light.primary100,
      borderRadius: 10,
      height: 120,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,  
      elevation: 5,
    },
    rightBorder:{
      borderRightWidth: 1,
      borderRightColor: '#D8D9E0'
    },
    ranking: {
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
      paddingRight: 5,
    },
    rankingText: {
      color: '#62636C',
      fontFamily: 'OpenSans-SemiBold',
      fontSize: 18,
    },
    RankIcon: {
      width: 100,
      height: 50,
    },
    PointsIcon: {
      width: 100,
      height: 50,
    },
    score: {
      fontFamily: 'OpenSans-Bold',
      fontSize: 20,
      color: '#614BF2',
    }
  })
  

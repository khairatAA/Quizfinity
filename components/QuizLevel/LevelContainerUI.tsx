import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { FIREBASE_AUTH } from '../../firebaseConfig'
import {FIREBASE_DB} from '../../firebaseConfig'
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'

type LevelContainerUIType = {
  onPress?: any;
  levelName?: any;
  category?: any
}

const LevelContainerUI = ({onPress, levelName, category}: LevelContainerUIType) => {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    handleScoreRetrival()
  }, [])

  const handleScoreRetrival = async () => {
    const level = `level_${levelName}`
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
                    setCurrentScore(levelData[level])
                } else {
                  setCurrentScore(0)
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

  const percentage = (currentScore ? Math.floor((currentScore / 150) * 100) : 0) + '%'

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.levelcontainerUI}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelName}>Level {levelName}</Text>
          <Text style={styles.completed}>{percentage} Completed</Text>
        </View>
        <AntDesign name="right" size={24} color={`#1E1F24`} />
      </View>
    </TouchableOpacity>
  )
}

export default LevelContainerUI

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.light.primary100,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2.5,
  },
  levelcontainerUI: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  completed: {
    color: '#62636C',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  levelInfo:{
    gap: 5
  },
  levelName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  }
})

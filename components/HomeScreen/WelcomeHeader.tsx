import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {getDoc, doc} from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';

const WelcomeHeader = () => {
    const [userDetails, setUserDetails] = useState<any | null>(null)

    const getUserDetails = async () => {
      try { 
          const user = FIREBASE_AUTH.currentUser;
          if (user) {
              const userId = user.uid; // Get the user ID
              const userDocRef = doc(FIREBASE_DB, 'users', userId);
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                  const userData = userDocSnap.data();
                  setUserDetails(userData);
                  
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
      getUserDetails();
    }, []) // Dependency array is empty, so the effect runs only once when the component mounts
  );

  const shortUsername = userDetails ? userDetails.username.substring(0, 10) + (userDetails.username.length > 10 ? '...' : '') : '';

  return (
    <>
    {/* Header */}
    <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>

        <Animated.View entering={ZoomIn.duration(1000)}>
          <Text style={styles.headerName}>{userDetails ? `Hi, ${shortUsername}` : 'Hi, User'}</Text>
        </Animated.View>

        <Text style={styles.headerText}>Let's make this day productive</Text>
        </View>
        <View style={styles.headerUserIcon}>
          {userDetails && userDetails.profilePictureUrl && isValidUrl(userDetails.profilePictureUrl) ? (
              <Image
                  source={{ uri: userDetails.profilePictureUrl }}
                  style={styles.profilePicture}
              />
          ) : (
              <AntDesign name="user" size={28} color={`${Colors.light.primary100}`} />
          )}
        </View>
    </View>
    </>
  )
}

// Helper function to validate URL
const isValidUrl = (url: string) => {
  try {
      new URL(url);
      return true;
  } catch (_) {
      return false;
  }
};

export default WelcomeHeader

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingHorizontal: 20,
    },
    headerTextContainer: {
      gap: 3,
    },
    headerName:{
      fontFamily: 'OpenSans-Bold',
      fontSize: 26,
    },
    headerText: {
      color: '#62636C',
      fontFamily: 'OpenSans-SemiBold',
      fontSize: 16,
    },
    headerUserIcon: {
      width: 50,
      height: 50,
      borderRadius: 200,
      backgroundColor: '#614BF2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
})

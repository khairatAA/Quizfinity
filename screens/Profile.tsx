import { View, Text, SafeAreaView, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {signOut} from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB, googleProvider } from '../firebaseConfig'
import { getItem, removeItem } from '../utilis/asyncStorage'
import { useNavigation } from '@react-navigation/native'
import RegisterInterface from '../components/ui/RegisterInferface'
import PrimaryButton from '../components/ui/PrimaryButton'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import {Controller, useForm} from 'react-hook-form'
import CustomInput from '../components/CustomInput/CustomInput'
import { AntDesign } from '@expo/vector-icons';
import { updateEmail, updatePassword } from 'firebase/auth';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import AwesomeAlert from 'react-native-awesome-alerts';

const {width, height} = Dimensions.get('window');

const Profile = () => {
  const { control, handleSubmit, setValue, formState: {errors} } = useForm();
  const navigation = useNavigation()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // Set initial values for input fields
            setValue('username', userData.username);
            setValue('profilePictureUrl', userData.profilePictureUrl);
            setValue('email', user.email);
          } else {
            console.log('User document not found');
          }
        } else {
          console.log('No user is currently logged in');
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    };

    getUserProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await removeItem({key: 'loggedIn'})
      
      await signOut(FIREBASE_AUTH)
      console.log('Remove log in status: ', await getItem({key: 'loggedIn'}));
      navigation.navigate('LogIn')
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to Sign Out. Please try again.'); 
    }
  }

  const handleEditProfile = async ({ username, profilePictureUrl, email, password }: any) => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        // Update profile picture URL in Firestore
        if (profilePictureUrl) {
          const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
          await updateDoc(userDocRef, {
            profilePictureUrl: profilePictureUrl
          });
        }
  
        // Update username in Firestore
        if (username) {
          const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
          await updateDoc(userDocRef, {
            username: username,
          });
        }
  
        // Update email if provided and different
        if (email && email !== user.email) {
          await updateEmail(user, email);
        }
  
        // Update password if provided
        if (password) {
          await updatePassword(user, password);
        }
  
        console.log('Profile updated successfully');
        setShowSuccessAlert(true);
        // Navigate to the profile or home screen
      } else {
        console.log('No user is currently logged in');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      setShowErrorAlert(true);
      // Alert.alert('Error', 'Failed to update profile. Please try again.'); 
    }
  }

  return (
    <RegisterInterface title='Profile' style={styles.registerationInterface}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputs}>

            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <CustomInput
              control={control}
              name='username'
              fieldName='Username'
              rules={{required: 'Username is required',  minLength: {
                value: 8,
                message: 'Username should be at least 8 characters long'
              },
              maxLength: {
                value: 24,
                message: 'Password should be max 24 characters long'
              }}}
              placeholder='Khairat12345'
              keyboardType='default'
              autoCapitalize='none'
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
              <CustomInput
              control={control}
              name='profilePictureUrl'
              fieldName='Profile Picture URL'
              placeholder='https://'
              keyboardType='default'
              autoCapitalize='none'
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <CustomInput
                control={control}
                name='email'
                fieldName='Email Address'
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                }}
                placeholder='khairat@gmail.com'
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
              <CustomInput
                  control={control}
                  name='password'
                  rules={{required: 'Password is required', minLength: {
                    value: 8,
                    message: 'Password should be minimum 8 characters long'
                  }}}
                  fieldName='Password'
                  placeholder='•••••••••••••'
                  secureTextEntry
                  autoCapitalize='none'
                />
            </Animated.View>

            <TouchableOpacity onPress={handleSignOut} style={styles.logOut}>
              <AntDesign name="logout" size={32} color='red' />
              <Text style={{color: 'red', fontFamily: 'OpenSans-Bold', fontSize: 18}}>Log Out</Text>
            </TouchableOpacity>

          </View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <PrimaryButton onPress={handleSubmit(handleEditProfile)} ButtonText='Update Profile' />
          </Animated.View>

          <AwesomeAlert
            show={showSuccessAlert}
            showProgress={false}
            title="Success"
            message="Profile updated successfully!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#614BF2"
            onConfirmPressed={() => setShowSuccessAlert(false)}
          />

          <AwesomeAlert
            show={showErrorAlert}
            showProgress={false}
            title="Error"
            message="Failed to update profile. Please try again."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => setShowErrorAlert(false)}
          />
        </View>
      </ScrollView>
    </RegisterInterface>
  )
}

export default Profile

const styles = StyleSheet.create({
  registerationInterface:{
    height: width * 0.3,
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  inputs: {
    gap: 10,
  },
  forgetPassword: {
    textAlign: 'right',
    color: '#614BF2'
  },
  logOut: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent:'flex-end'
  }
})
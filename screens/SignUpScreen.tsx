import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native'
import React from 'react'
import RegisterInterface from '../components/ui/RegisterInferface'
import { useNavigation } from '@react-navigation/native'
import { getItem, removeItem, storeItem } from '../utilis/asyncStorage'
import PrimaryButton from '../components/ui/PrimaryButton'
import LoginWithGoogle from '../components/ui/LoginWithGoogle'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput/CustomInput'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth'
import { FIREBASE_DB, googleProvider } from '../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigation = useNavigation()

  const handleReset = async () => {
    // await removeItem({key: 'onboarded'})
    navigation.navigate('Onboarding')
  }

  const onSignUpPress = async ({ username, email, password }: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)

      const uid = userCredential.user.uid

      const userDocRef = doc(FIREBASE_DB, 'users', uid);
      await setDoc(userDocRef, {
        username: username,
      })

      // await storeItem({key: 'loggedIn', value: '1'})
      navigation.navigate('ButtomTab')
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    }
  }

  return (
    <RegisterInterface onPress={handleReset} title='Sign Up' style={styles.registerationInterface}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputs}>

            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <CustomInput
                control={control}
                name='username'
                fieldName='Username'
                rules={{
                  required: 'Username is required', minLength: {
                    value: 8,
                    message: 'Username should be at least 8 characters long'
                  },
                  maxLength: {
                    value: 24,
                    message: 'Password should be max 20 characters long'
                  }
                }}
                placeholder='Khairat12345'
                keyboardType='default'
                autoCapitalize='none'
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
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

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
              <CustomInput
                control={control}
                name='password'
                rules={{
                  required: 'Password is required', minLength: {
                    value: 8,
                    message: 'Password should be minimum 8 characters long'
                  }
                }}
                fieldName='Password'
                placeholder='•••••••••••••'
                secureTextEntry
                autoCapitalize='none'
              />
            </Animated.View>
          </View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <PrimaryButton onPress={handleSubmit(onSignUpPress)} ButtonText='Sign Up' />
          </Animated.View>

        </View>
        <LoginWithGoogle
          InstructionText="Already have an account"
          ActionLink='Log In'
          style={{ gap: 20 }}
          onPress={() => navigation.navigate('LogIn')}
        />
      </ScrollView>
    </RegisterInterface>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  registerationInterface: {
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
  }
})
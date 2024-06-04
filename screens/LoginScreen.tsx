import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import RegisterInterface from '../components/ui/RegisterInferface'
import { useNavigation } from '@react-navigation/native'
import { getItem, removeItem, storeItem } from '../utilis/asyncStorage'
import PrimaryButton from '../components/ui/PrimaryButton'
import LoginWithGoogle from '../components/ui/LoginWithGoogle'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form'
import { FIREBASE_AUTH } from '../firebaseConfig'
import CustomInput from '../components/CustomInput/CustomInput'
import { signInWithEmailAndPassword } from 'firebase/auth'


const LoginScreen = ({ isLoggedIn }: any) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const navigation = useNavigation()

  const handleReset = async () => {
    navigation.navigate('Onboarding')
  }

  const onLoginPress = async ({ email, password }: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      await storeItem('loggedIn', '1');
      reset()
      navigation.navigate('ButtomTab')
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'Failed to login. Please check your email and password.');
    }
  }

  return (
    <RegisterInterface onPress={handleReset} title='Log In'>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputs}>

            <Animated.View entering={FadeInDown.duration(1000).springify()}>
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
              <TouchableOpacity>
                <Text style={styles.forgetPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>

          </View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <PrimaryButton onPress={handleSubmit(onLoginPress)} ButtonText='Log In' />
          </Animated.View>

        </View>
        <LoginWithGoogle
          InstructionText="Don't have an account?"
          ActionLink='Sign Up'
          onPress={() => navigation.navigate('SignUp')}
        />
      </ScrollView>
    </RegisterInterface>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  form: {
    gap: 35,
  },
  inputs: {
    gap: 20,
  },
  forgetPassword: {
    textAlign: 'right',
    color: '#614BF2'
  }
})
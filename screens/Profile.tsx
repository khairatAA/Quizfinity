import { View, Text, SafeAreaView, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut, deleteUser } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import RegisterInterface from '../components/ui/RegisterInferface'
import PrimaryButton from '../components/ui/PrimaryButton'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput/CustomInput'
import { AntDesign } from '@expo/vector-icons';
import { updateEmail, updatePassword } from 'firebase/auth';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import AwesomeAlert from 'react-native-awesome-alerts';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const navigation = useNavigation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile();
    }, []) // Dependency array is empty, so the effect runs only once when the component mounts
  );

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate('Onboarding');
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
          await updateDoc(userDocRef, { profilePictureUrl: profilePictureUrl });
        }

        // Update username in Firestore
        if (username) {
          const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
          await updateDoc(userDocRef, { username: username });
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
        reset()
      } else {
        console.log('No user is currently logged in');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      setShowErrorAlert(true);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
        await deleteDoc(userDocRef);
        await deleteUser(user);
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      console.log('Error deleting account:', error);
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  }

  const showModal = () => {
    setDeleteModalVisible(true);
  }

  const hideModal = () => {
    setDeleteModalVisible(false);
  }

  return (
    <RegisterInterface title='Profile' style={styles.registerationInterface}>
      <ScrollView >
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
                    message: 'Password should be max 24 characters long'
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

            <TouchableOpacity onPress={handleSignOut} style={styles.logOut}>
              <AntDesign name="logout" size={32} color='red' />
              <Text style={{ color: 'red', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>Log Out</Text>
            </TouchableOpacity>

          </View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <PrimaryButton onPress={handleSubmit(handleEditProfile)} ButtonText='Update Profile' />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()}>
            <PrimaryButton onPress={showModal} ButtonText='Delete Account' style={styles.deleteButton} />
          </Animated.View>

          <View style={{ height: 100 }}>
            <Text>{" "}</Text>
          </View>

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={hideModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.modalMessage}>Are you sure you want to delete your account? This action cannot be undone.</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={hideModal} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteAccount} style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </RegisterInterface>
  )
}

export default Profile

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
  },
  logOut: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 50,
    marginBottom: 180,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

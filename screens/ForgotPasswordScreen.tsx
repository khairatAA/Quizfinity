import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import PrimaryButton from '../components/ui/PrimaryButton';
import CustomInput from '../components/CustomInput/CustomInput';
import RegisterInterface from '../components/ui/RegisterInferface';
import AwesomeAlert from 'react-native-awesome-alerts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ButtomInstruction from '../components/ui/ButtomInstruction';

const ForgotPasswordScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const handleGoBack = () => {
        navigation.navigate('LogIn');
    };

    const onSendResetLinkPress = async ({ email }: any) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(FIREBASE_AUTH, email);
            setAlertTitle('Password Reset');
            setAlertMessage('Password reset link has been sent to your email.');
            setAlertVisible(true);
        } catch (error: any) {
            let errorMessage = 'Failed to send password reset email. Please try again.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.';
            }

            setAlertTitle('Error');
            setAlertMessage(errorMessage);
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegisterInterface onPress={handleGoBack} title='Forgot Password'>
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
                    </View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
                        <PrimaryButton onPress={handleSubmit(onSendResetLinkPress)} ButtonText='Send Reset Link' />
                    </Animated.View>

                    {loading && <ActivityIndicator size="large" color="#0000ff" />}
                </View>
                <ButtomInstruction
                    InstructionText="Remembered your password?"
                    ActionLink='Log In'
                    onPress={() => navigation.navigate('LogIn')}
                />
            </ScrollView>
            <AwesomeAlert
                show={alertVisible}
                showProgress={false}
                title={alertTitle}
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setAlertVisible(false)
                    alertMessage === 'Password reset link has been sent to your email.' && navigation.navigate('LogIn');
                }}
            />
        </RegisterInterface>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
    inputs: {
        gap: 10,
    },
});

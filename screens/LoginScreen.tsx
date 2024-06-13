import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import PrimaryButton from "../components/ui/PrimaryButton";
import ButtomInstruction from "../components/ui/ButtomInstruction";
import CustomInput from "../components/CustomInput/CustomInput";
import RegisterInterface from "../components/ui/RegisterInferface";
import AwesomeAlert from "react-native-awesome-alerts";
import Animated, { FadeInDown } from "react-native-reanimated";
import { storeItem } from "../utilis/asyncStorage";
import * as Keychain from "react-native-keychain";

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [resendVerification, setResendVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleGoBack = () => {
    navigation.navigate("SignUp");
  };

  const onLoginPress = async ({ email, password }: any) => {
    setLoading(true);
    setUserEmail(email);
    setUserPassword(password);

    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        // Update Firestore document to reflect the verified status
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        await updateDoc(userDocRef, { verified: true });
      } else {
        setAlertTitle("Email not verified");
        setAlertMessage("Please verify your email before logging in.");
        setResendVerification(true);
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        if (userDoc.data()?.verified) {
          // await storeItem("loggedIn", "1");
          reset();
          navigation.navigate("ButtomTab", { screen: "Home" });
        } else {
          setAlertTitle("Verification");
          setAlertMessage("Your email is not verified.");
          setResendVerification(true);
          setAlertVisible(true);
        }
      } else {
        setAlertTitle("Error");
        setAlertMessage("User data not found.");
        setAlertVisible(true);
      }
    } catch (error: any) {
      console.log("Error code: ", error.code);
      let errorMessage =
        "Failed to login. Please check your email and password.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Please enter a valid email and password";
      } else if (error.code === "unavailable") {
        errorMessage =
          "It seems you are currently offine, please try again later.";
      }

      setAlertTitle("Error");
      setAlertMessage(errorMessage);
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const onResendVerificationEmail = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        userEmail,
        userPassword
      );
      await sendEmailVerification(userCredential.user);
      setAlertTitle("Verification Email Sent");
      setAlertMessage("Please check your email to verify your account.");
      setResendVerification(false);
    } catch (error: any) {
      let errorMessage =
        "Failed to resend verification email. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      }

      setAlertTitle("Error");
      setAlertMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterInterface onPress={handleGoBack} title="Log In">
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <CustomInput
                control={control}
                name="email"
                fieldName="Email Address"
                defaultValue={userEmail}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                }}
                placeholder="khairat@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
            >
              <CustomInput
                control={control}
                name="password"
                defaultValue={userPassword}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be minimum 8 characters long",
                  },
                }}
                fieldName="Password"
                placeholder="•••••••••••••"
                secureTextEntry
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgetPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#614BF2" />
          ) : (
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
            >
              <PrimaryButton
                onPress={handleSubmit(onLoginPress)}
                ButtonText="Log In"
              />
            </Animated.View>
          )}
        </View>
        <ButtomInstruction
          InstructionText="Don't have an account?"
          ActionLink="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </ScrollView>

      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={resendVerification}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText={resendVerification ? "Resend Verification Email" : "OK"}
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setAlertVisible(false)}
        onConfirmPressed={() => {
          if (resendVerification) {
            onResendVerificationEmail();
          } else {
            setAlertVisible(false);
          }
        }}
      />
      {resendVerification && (
        <View style={styles.modalInputContainer}>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter your password"
            secureTextEntry
            value={userPassword}
            onChangeText={setUserPassword}
          />
        </View>
      )}
    </RegisterInterface>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    gap: 35,
  },
  inputs: {
    gap: 20,
  },
  forgetPassword: {
    textAlign: "right",
    color: "#614BF2",
    textDecorationLine: "underline",
  },
  modalInputContainer: {
    padding: 20,
    alignItems: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
  },
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import PrimaryButton from "../components/ui/PrimaryButton";
import ButtomInstruction from "../components/ui/ButtomInstruction";
import CustomInput from "../components/CustomInput/CustomInput";
import RegisterInterface from "../components/ui/RegisterInferface";
import AwesomeAlert from "react-native-awesome-alerts";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const handleGoBack = async () => {
    navigation.navigate("Onboarding");
  };

  const checkUsernameExists = async (username: string) => {
    const usersRef = collection(FIREBASE_DB, "users");
    // console.log("usersRef:", usersRef);

    const q = query(usersRef, where("username", "==", username));
    // console.log("query:", q);

    try {
      const querySnapshot = await getDocs(q);
      // console.log("querySnapshot empty:", querySnapshot.empty);
      querySnapshot.forEach((doc) => {
        // console.log("doc data:", doc.data());
      });
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking username existence:", error);
      throw error;
    }
  };

  const onSignUpPress = async ({ username, email, password }: any) => {
    setLoading(true);
    try {
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        setAlertTitle("Error");
        setAlertMessage(
          "Username already exists. Please choose a different username."
        );
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      const uid = user.uid;
      const userDocRef = doc(FIREBASE_DB, "users", uid);
      await setDoc(userDocRef, {
        username: username,
        email: email,
        verified: false,
      });

      reset();
      setAlertTitle("Verification Email Sent");
      setAlertMessage("Please check your email to verify your account.");
      setAlertVisible(true);
    } catch (error: any) {
      console.log(error.code);
      let errorMessage = "Failed to sign up. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      }

      setAlertTitle("Error");
      setAlertMessage(errorMessage);
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterInterface
      onPress={handleGoBack}
      title="Sign Up"
      style={styles.registerationInterface}
    >
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <CustomInput
                control={control}
                name="username"
                fieldName="Username"
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 8,
                    message: "Username should be at least 8 characters long",
                  },
                  maxLength: {
                    value: 24,
                    message: "Username should be max 24 characters long",
                  },
                }}
                placeholder="Khairat12345"
                keyboardType="default"
                autoCapitalize="none"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
            >
              <CustomInput
                control={control}
                name="email"
                fieldName="Email Address"
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
              entering={FadeInDown.delay(400).duration(1000).springify()}
            >
              <CustomInput
                control={control}
                name="password"
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
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
            >
              <CustomInput
                control={control}
                name="confirmPassword"
                fieldName="Confirm Password"
                placeholder="•••••••••••••"
                rules={{
                  validate: (value: string) =>
                    value === watch("password") || "Passwords do not match",
                }}
                secureTextEntry
                autoCapitalize="none"
                showPasswordIcon={true}
              />
            </Animated.View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#614BF2" />
          ) : (
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
            >
              <PrimaryButton
                onPress={handleSubmit(onSignUpPress)}
                ButtonText="Sign Up"
              />
            </Animated.View>
          )}
        </View>
        <ButtomInstruction
          InstructionText="Already have an account?"
          ActionLink="Log In"
          onPress={() => navigation.navigate("LogIn")}
        />
        <Text style={{ height: 400 }}> </Text>
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
          setAlertVisible(false);
          alertMessage === "Please check your email to verify your account." &&
            navigation.navigate("LogIn");
        }}
      />
    </RegisterInterface>
  );
};

export default SignUpScreen;

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
});

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FIREBASE_AUTH } from "../firebaseConfig";
import CustomInput from "../components/CustomInput/CustomInput";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import AwesomeAlert from "react-native-awesome-alerts";
import RegisterInterface from "../components/ui/RegisterInferface";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoBack = () => {
    navigation.navigate("ButtomTab");
  };

  const onSubmit: SubmitHandler<FormData> = async ({
    currentPassword,
    newPassword,
  }) => {
    if (newPassword === currentPassword) {
      setErrorMessage(
        "New password cannot be the same as the current password."
      );
      setShowErrorAlert(true);
      return;
    }

    try {
      setLoading(true);
      const user = FIREBASE_AUTH.currentUser;
      if (user && currentPassword) {
        // Reauthenticate the user
        const credential = EmailAuthProvider.credential(
          user.email as string,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        console.log("Password updated successfully");
        setShowSuccessAlert(true);
        reset();
      } else {
        console.log("No user is currently logged in");
        setShowErrorAlert(true);
      }
    } catch (error: any) {
      console.log("Error updating password:", error);
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("The current password is incorrect.");
      } else {
        setErrorMessage("Failed to update password. Please try again.");
      }
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterInterface onPress={handleGoBack} title="Update Password">
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <CustomInput
                control={control}
                name="currentPassword"
                fieldName="Current Password"
                placeholder="•••••••••••••"
                rules={{ required: "Current password is required" }}
                secureTextEntry
                autoCapitalize="none"
                showPasswordIcon
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(2000).springify()}>
              <CustomInput
                control={control}
                name="newPassword"
                fieldName="New Password"
                placeholder="•••••••••••••"
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "New password should be minimum 8 characters long",
                  },
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                showPasswordIcon
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(3000).springify()}>
              <CustomInput
                control={control}
                name="confirmPassword"
                fieldName="Confirm Password"
                placeholder="•••••••••••••"
                rules={{
                  validate: (value: string) =>
                    value === watch("newPassword") || "Passwords do not match",
                }}
                secureTextEntry
                autoCapitalize="none"
                showPasswordIcon
              />
            </Animated.View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#614BF2" />
          ) : (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitButtonText}>Update Password</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ height: 500 }}> </Text>
      </ScrollView>

      <AwesomeAlert
        show={showSuccessAlert}
        showProgress={false}
        title="Success"
        message="Password updated successfully!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#614BF2"
        onConfirmPressed={() => {
          setShowSuccessAlert(false);
          navigation.navigate("ButtomTab", { screen: "Home" });
        }}
      />

      <AwesomeAlert
        show={showErrorAlert}
        showProgress={false}
        title="Error"
        message={errorMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowErrorAlert(false)}
      />
    </RegisterInterface>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  inputs: {
    gap: 10,
  },
  submitButton: {
    backgroundColor: "#614BF2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "OpenSans-Regular",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

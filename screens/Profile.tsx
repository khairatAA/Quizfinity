import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RegisterInterface from "../components/ui/RegisterInferface";
import PrimaryButton from "../components/ui/PrimaryButton";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { updateEmail, updatePassword } from "firebase/auth";
import {
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import AwesomeAlert from "react-native-awesome-alerts";
import { removeItem } from "../utilis/asyncStorage";

const { width, height } = Dimensions.get("window");

const checkUsernameExists = async (username: string) => {
  const usersRef = collection(FIREBASE_DB, "users");
  const q = query(usersRef, where("username", "==", username));

  try {
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking username existence:", error);
    throw error;
  }
};

const Profile = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [initalUsername, setInitalUsername] = useState("");
  const [initalPorfilePicture, setInitalPorfilePicture] = useState("");

  const getUserProfile = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Set initial values for input fields
          setValue("username", userData.username);
          setInitalUsername(userData.username);

          setValue("profilePictureUrl", userData.profilePictureUrl);
          setInitalPorfilePicture(userData.profilePictureUrl);

          setValue("email", user.email);
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("No user is currently logged in");
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile();
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      await removeItem("loggedIn");
      navigation.navigate("LogIn");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to Sign Out. Please try again.");
    }
  };

  const handleEditProfile = async ({
    username,
    profilePictureUrl,
    email,
  }: any) => {
    setLoading(true);
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        // Messages to track updates
        const updates: string[] = [];

        // Update profile picture URL in Firestore
        if (profilePictureUrl !== initalPorfilePicture) {
          const userDocRef = doc(FIREBASE_DB, "users", user.uid);
          await updateDoc(userDocRef, { profilePictureUrl: profilePictureUrl });
          updates.push("Profile Picture URL");
        }

        // Update username in Firestore
        if (username !== initalUsername) {
          const usernameExists = await checkUsernameExists(username);
          if (usernameExists) {
            setErrorMessage(
              "Username already exists. Please choose a different username."
            );
            setShowErrorAlert(true);
            setLoading(false);
            return;
          }
          const userDocRef = doc(FIREBASE_DB, "users", user.uid);
          await updateDoc(userDocRef, { username: username });
          updates.push("Username");
        }

        // Update email if provided and different
        if (email && email !== user.email) {
          await updateEmail(user, email);
          updates.push("Email");
        }

        if (
          profilePictureUrl !== initalPorfilePicture ||
          username !== initalUsername ||
          (email && email !== user.email)
        ) {
          setSuccessMessage(
            `Profile updated successfully! Updated fields: ${updates.join(
              ", "
            )}`
          );
          setShowSuccessAlert(true);
          reset();
        } else {
          setErrorMessage(
            "Please make an update to any of the fields before clicking the button."
          );
          setShowErrorAlert(true);
        }
      } else {
        console.log("No user is currently logged in");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleteLoading(true);
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        await deleteDoc(userDocRef);
        await deleteUser(user);
        setIsDeleteLoading(false);
        setDeleteModalVisible(false);
        navigation.navigate("Onboarding");
      }
    } catch (error) {
      console.log("Error deleting account:", error);
      setIsDeleteLoading(false);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };

  const showModal = () => {
    setDeleteModalVisible(true);
  };

  const hideModal = () => {
    setDeleteModalVisible(false);
  };

  return (
    <RegisterInterface
      title="Profile"
      style={styles.registerationInterface}
      onPress={() => navigation.navigate("Home")}
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
                    value: 20,
                    message: "Username should be max 20 characters long",
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
                name="profilePictureUrl"
                fieldName="Profile Picture URL"
                placeholder="https://"
                keyboardType="default"
                autoCapitalize="none"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
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
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdatePassword")}
            >
              <Text style={styles.forgetPassword}>Change Password?</Text>
            </TouchableOpacity>

            <View style={styles.logOutButtonContainer}>
              <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.logOutButtonText}>
                  Log Out <AntDesign name="logout" size={16} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#614BF2" />
          ) : (
            <View style={styles.updateButtonContainer}>
              <TouchableOpacity onPress={handleSubmit(handleEditProfile)}>
                <Text style={styles.updateButtonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          )}

          <Animated.View
            entering={FadeInDown.delay(1000).duration(1000).springify()}
          >
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={showModal}>
                <Text style={styles.deleteButtonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* <View style={{ height: 200 }}>
            <Text> </Text>
          </View> */}

          <AwesomeAlert
            show={showSuccessAlert}
            showProgress={false}
            title="Success"
            message={successMessage}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#614BF2"
            onConfirmPressed={() => {
              setShowSuccessAlert(false),
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
              <Text style={styles.modalMessage}>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={hideModal}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteAccount}
                  style={styles.confirmButton}
                >
                  {isDeleteLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.confirmButtonText}>Delete</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </RegisterInterface>
  );
};

export default Profile;

const styles = StyleSheet.create({
  registerationInterface: {
    height: width * 0.3,
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  inputs: {
    gap: 20,
  },
  forgetPassword: {
    textAlign: "left",
    color: "#614BF2",
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
    marginTop: 10,
    marginRight: 10,
    textDecorationLine: "underline",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logOutButtonContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logOutButtonText: {
    color: "red",
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
  updateButtonContainer: {
    marginTop: 20,
  },
  updateButtonText: {
    backgroundColor: "#614BF2",
    color: "white",
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#614BF2",
    borderRadius: 5,
  },
  deleteButtonContainer: {
    marginTop: 30,
    marginBottom: 150,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "red",
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black color
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

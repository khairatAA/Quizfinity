import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { FIREBASE_DB } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";
import AwesomeAlert from "react-native-awesome-alerts";

type LevelContainerUIType = {
  onPress?: any;
  levelName?: any;
  category?: any;
  isLocked: boolean;
  onUnlock: () => void;
};

const LevelContainerUI = ({
  onPress,
  levelName,
  category,
  isLocked,
  onUnlock,
}: LevelContainerUIType) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  useEffect(() => {
    handleScoreRetrival();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  const handleScoreRetrival = async () => {
    const level = `level_${levelName}`;
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userId = user.uid; // Get the user ID
        const userDocRef = doc(FIREBASE_DB, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const categoryDocRef = doc(
            FIREBASE_DB,
            "users",
            userId,
            "game_categories",
            category
          );
          const categoryDocSnap = await getDoc(categoryDocRef);

          if (categoryDocSnap.exists()) {
            const levelData = categoryDocSnap.data();
            setCurrentScore(levelData[level]);
          } else {
            setCurrentScore(0);
          }
        } else {
          console.log("User document not found");
          setAlertTitle("User Not Found");
          setAlertMessage(
            "Please create an account to continue using the app."
          );
          setShowAlert(true);
        }
      } else {
        setAlertTitle("Not Logged In");
        setAlertMessage("No user is currently logged in. Please Login");
        setShowAlert(true);
        console.log("No user is currently logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {
    if (isLocked) {
      setAlertTitle("Level Locked");
      setAlertMessage(
        "This level is locked. Complete previous levels with at least 50% score to unlock."
      );
      setShowAlert(true);
      return;
    }
    if (!isConnected) {
      setAlertTitle("No Internet Connection");
      setAlertMessage("You need an internet connection to play this level.");
      setShowAlert(true);
      return;
    }
    onPress();
  };

  const percentage =
    (currentScore ? Math.floor((currentScore / 150) * 100) : 0) + "%";

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.levelcontainerUI}>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Level {levelName}</Text>
            <Text style={styles.completed}>{percentage} Completed</Text>
          </View>
          <AntDesign name="right" size={24} color={`#1E1F24`} />
        </View>
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#614BF2"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default LevelContainerUI;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.light.primary100,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2.5,
  },
  levelcontainerUI: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  completed: {
    color: "#62636C",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
  },
  levelInfo: {
    gap: 5,
  },
  levelName: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
  },
});

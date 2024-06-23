import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LevelContainerUI from "./LevelContainerUI";
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomInLeft,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { FIREBASE_DB } from "../../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const LevelContainer = ({ route }: any) => {
  const { levelDetails, category } = route.params;
  const navigation = useNavigation();
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);

  useEffect(() => {
    retrieveUnlockedLevels();
  }, []);

  const retrieveUnlockedLevels = async () => {
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
            const levelsUnlocked = [1];
            levelDetails.forEach((level: any) => {
              const levelName = `level_${level.level_number}`;
              const score = levelData[levelName];
              if (score >= 75) {
                // Assuming 150 is the max score and 50% is 75
                levelsUnlocked.push(level.level_number + 1);
              }
            });
            setUnlockedLevels(levelsUnlocked);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => (
    <Animated.View entering={ZoomInLeft.duration(1000).delay(300 * item.id)}>
      <LevelContainerUI
        levelName={item.level_number}
        category={category}
        isLocked={!unlockedLevels.includes(item.level_number)}
        onUnlock={retrieveUnlockedLevels}
        onPress={() => {
          navigation.navigate("QuizInstruction", {
            levelNumber: item.level_number,
            category: category,
            levelDetails: levelDetails,
          });
        }}
      />
    </Animated.View>
  );

  return (
    <FlatList
      data={levelDetails}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default LevelContainer;

const styles = StyleSheet.create({});

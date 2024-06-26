import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import Colors from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import GameHeader from "./GameHeader";
import { Timer } from "../../assets/GameScreenIcons";
import OptionsUI from "./OptionsUI";
import PrimaryButton from "../ui/PrimaryButton";

const { width, height } = Dimensions.get("window");

type GameUIType = {
  question?: any;
  style?: any;
  route: any;
  currentquestion?: any;
  totalQuestions?: any;
  timer?: any;
  OnPressNext?: any;
  OnPressBack?: any;
  options?: any[];
  onPressOption?: any;
  ShowResult?: any;
  selectedOption?: string;
};
const GameUI = ({
  question,
  style,
  route,
  currentquestion,
  totalQuestions,
  timer,
  OnPressNext,
  OnPressBack,
  options,
  onPressOption,
  ShowResult,
  selectedOption,
}: GameUIType) => {
  const sound = useRef<Audio.Sound | null>(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      setHasAudioPermission(granted);
    };

    getPermission();

    const loadSound = async () => {
      if (hasAudioPermission) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          require("../../assets/Audio/TickingTimerSound.mp3") // Replace with the path to your sound file
        );
        sound.current = loadedSound;
      }
    };

    loadSound();

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, [hasAudioPermission]);

  useEffect(() => {
    const playSound = async () => {
      if (sound.current && parseInt(timer.split(":")[0]) <= 1 && !isPlaying) {
        await sound.current.setIsLoopingAsync(true);
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    };

    const stopSound = async () => {
      if (sound.current && isPlaying) {
        await sound.current.stopAsync();
        setIsPlaying(false);
      }
    };

    if (parseInt(timer.split(":")[0]) <= 1) {
      playSound();
    } else {
      stopSound();
    }

    return () => {
      stopSound();
    };
  }, [timer]);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.stopAsync();
      }
    };
  }, []);

  const handlePressNext = () => {
    if (currentquestion === totalQuestions - 1) {
      if (sound.current) {
        sound.current.stopAsync();
      }
    }
    OnPressNext();
  };

  const handleShowResult = () => {
    if (sound.current) {
      sound.current.stopAsync();
    }
    ShowResult();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <GameHeader route={route} />

      <View style={[styles.questionContainer, style]}>
        <View style={styles.questionInfo}>
          <View style={styles.IndexTimeContainer}>
            <Text style={styles.questionIndexandTime}>
              {currentquestion} of {totalQuestions}
            </Text>
          </View>
          <View
            style={[
              styles.timer,
              styles.IndexTimeContainer,
              parseInt(timer.split(":")[0]) <= 1 ? styles.redBackground : null,
            ]}
          >
            <Timer width={40} height={20} />
            <Text style={styles.questionIndexandTime}>{timer}</Text>
          </View>
        </View>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={styles.questionText}
        >
          {question}
        </Animated.Text>
      </View>

      <View style={styles.optionsContainer}>
        <FlatList
          data={options}
          renderItem={({ item }: any) => (
            <OptionsUI
              option={decodeURIComponent(item)}
              onPress={() => onPressOption(item)}
              selected={selectedOption === decodeURIComponent(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={[
            styles.buttonContainer,
            currentquestion === 1 && styles.nextButton,
          ]}
        >
          {currentquestion !== 1 && (
            <PrimaryButton
              style={[styles.button, styles.BackButton]}
              ButtonText="Back"
              onPress={OnPressBack}
            />
          )}

          {currentquestion !== totalQuestions ? (
            <PrimaryButton
              style={styles.button}
              ButtonText="Next"
              onPress={handlePressNext}
            />
          ) : (
            <PrimaryButton
              style={styles.button}
              ButtonText="Result"
              onPress={handleShowResult}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#614BF2",
  },
  questionContainer: {
    backgroundColor: "#614BF2",
    padding: 25,
    width: "100%",
    gap: 30,
  },
  questionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
    color: Colors.light.primary100,
    alignSelf: "center",
  },
  IndexTimeContainer: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: Colors.light.primary400,
    borderColor: Colors.light.primary400,
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  questionIndexandTime: {
    color: "#1E1F24",
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
  },
  optionsContainer: {
    backgroundColor: Colors.light.primary100,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    paddingTop: 40,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: "45%",
  },
  nextButton: {
    justifyContent: "flex-end",
  },
  BackButton: {
    backgroundColor: "#80828D",
  },
  redBackground: {
    backgroundColor: "#FF7F7F",
  },
});

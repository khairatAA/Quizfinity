import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import PrimaryButton from "../ui/PrimaryButton";
import ResultHeader from "./ResultHeader";
import ResultDetail from "./ResultDetail";
import { Winner } from "../../assets/ResultsIcons";
import { formatTime } from "../GameScreen/GameUtilities";

const { width, height } = Dimensions.get("window");

type ResultsUITypes = {
  route: any;
  OnPressBack?: any;
  score?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  timeUsed?: any;
  totalQuestions?: any;
  skippedAnswers?: number;
};

const ResultsUI = ({
  route,
  OnPressBack,
  score,
  correctAnswers,
  wrongAnswers,
  timeUsed,
  totalQuestions,
  skippedAnswers,
}: ResultsUITypes) => {
  const percentage = (score ? Math.floor((score / 150) * 100) : 0) + "%";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ResultHeader route={route} />

      <View style={styles.scoreParentContainer}>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreContainer2}>
            <View style={styles.scoreContainer3}>
              <Animated.View
                entering={FadeInUp.duration(2000).springify()}
                style={styles.scoreInfo}
              >
                <Text style={styles.yourScore}>Your Score</Text>
                <View style={styles.points}>
                  <Text style={styles.score}>{score}</Text>
                  <Text style={styles.point}>pt</Text>
                </View>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <ScrollView>
          <View style={styles.ResultDetails}>
            <View style={styles.ResultGroup}>
              <ResultDetail
                value={percentage}
                title="Percentage"
                bulletStyle={styles.CompletedbulletStyle}
              />
              <ResultDetail
                value={
                  correctAnswers && correctAnswers <= 9
                    ? "0" + correctAnswers
                    : correctAnswers
                }
                title="Correct"
                bulletStyle={styles.correctAnswersbulletStyle}
              />
              <ResultDetail
                value={
                  wrongAnswers && wrongAnswers <= 9
                    ? "0" + wrongAnswers
                    : wrongAnswers
                }
                title="Wrong"
                bulletStyle={styles.wrongAnswersbulletStyle}
              />
            </View>

            <View style={styles.ResultGroup}>
              <ResultDetail
                value={score}
                title="Points Earned"
                bulletStyle={styles.CompletedbulletStyle}
              />
              <ResultDetail
                value={
                  timeUsed && timeUsed < 60
                    ? formatTime(timeUsed) + " secs"
                    : formatTime(timeUsed) + " mins"
                }
                title="Time Used"
                bulletStyle={styles.correctAnswersbulletStyle}
              />
              <ResultDetail
                value={
                  skippedAnswers && skippedAnswers <= 9
                    ? "0" + skippedAnswers
                    : skippedAnswers
                }
                title="Skipped"
                bulletStyle={styles.wrongAnswersbulletStyle}
              />
            </View>
          </View>
        </ScrollView>
        <View>
          <PrimaryButton ButtonText="Home" onPress={OnPressBack} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultsUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#614BF2",
  },
  scoreParentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    width: 220,
    height: 220,
    borderRadius: 200,
    backgroundColor: Colors.light.primary400,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreContainer2: {
    width: 180,
    height: 180,
    borderRadius: 200,
    backgroundColor: "#B3B8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreContainer3: {
    width: 160,
    height: 160,
    borderRadius: 200,
    backgroundColor: Colors.light.primary100,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreInfo: {},
  yourScore: {
    color: "#614BF2",
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
  },
  points: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  point: {
    color: "#614BF2",
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
  },
  score: {
    color: "#614BF2",
    fontFamily: "OpenSans-Bold",
    fontSize: 50,
  },
  detailsContainer: {
    backgroundColor: Colors.light.primary100,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    paddingTop: 40,
    flex: 1,
  },
  ResultDetails: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#614BF2",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ResultGroup: {
    flexDirection: "column",
  },
  CompletedbulletStyle: {
    color: "#614BF2",
  },
  wrongAnswersbulletStyle: {
    color: "red",
  },
  correctAnswersbulletStyle: {
    color: "green",
  },
});

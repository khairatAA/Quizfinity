import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GameUI from "./GameUI";
import OptionsUI from "./OptionsUI";
import { useNavigation } from "@react-navigation/native";
import { formatTime, getInitialTime, shuffleArray } from "./GameUtilities";
import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../../constants/Colors";

// Map of category names to their IDs
type categoryMapTypes = {
  Technology: number;
  Science: number;
  Entertainment: number;
  Art: number;
  Geography: number;
  History: number;
};

const categoryMap: categoryMapTypes = {
  Technology: 18,
  Science: 17,
  Entertainment: 14,
  Art: 9,
  Geography: 22,
  History: 23,
};

// Map of difficulty levels
const difficultyMap = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

type Question = {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  // Add other properties as needed
};

const GameInterface = ({ route }: any) => {
  const { category, levelNumber } = route.params;
  const categoryId = categoryMap[category as keyof categoryMapTypes];
  const difficulty =
    levelNumber <= 2 ? "easy" : levelNumber <= 4 ? "medium" : "hard";
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [timer, setTimer] = useState(getInitialTime(difficulty));
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch questions from the API
    fetchQuestions();
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (!loading) {
      // Start the timer countdown
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            handleResultPress();
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [loading]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=15&category=${categoryId}&difficulty=${difficulty}&type=multiple&encode=url3986`
      );

      const fetchedQuestions = response.data.results;
      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setOptions(generateOptionsAndShuffle(fetchedQuestions[0]));
        setLoading(false);
      } else {
        handleError("No questions available.");
        console.error("No questions fetched.");
      }
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      handleError("Error fetching questions.");
    }
  };

  const handleError = (message: string) => {
    setAlertTitle("Error");
    setAlertMessage(message + " Please try again later.");
    setShowAlert(true);
    setLoading(false);
  };

  const generateOptionsAndShuffle = (_question: Question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);

    shuffleArray(options);

    return options;
  };

  const handleNextPress = () => {
    setAnsweredCorrectly(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOptions(
        generateOptionsAndShuffle(questions[currentQuestionIndex + 1])
      );
    } else {
      handleResultPress();
    }
  };

  const handleBackPress = () => {
    setAnsweredCorrectly(false);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Decrement the current question index
      setOptions(
        generateOptionsAndShuffle(questions[currentQuestionIndex - 1])
      ); // Use the previous question index
    }
  };

  const handleSelectedOption = async (_option: string) => {
    const option = decodeURIComponent(_option);

    const correctOption = decodeURIComponent(
      questions[currentQuestionIndex].correct_answer
    );
    const isCorrect = option === correctOption;

    if (isCorrect && !answeredCorrectly) {
      setScore((prevScore) => prevScore + 10);
      setCorrectAnswers((prev) => prev + 1);
      setAnsweredCorrectly(true);
    } else if (!isCorrect && answeredCorrectly) {
      setWrongAnswers((prev) => prev + 1);
      setAnsweredCorrectly(false);
    } else if (!isCorrect) {
      setWrongAnswers((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOptions(
        generateOptionsAndShuffle(questions[currentQuestionIndex + 1])
      );
      setAnsweredCorrectly(false);
    }
  };

  const handleResultPress = () => {
    const totalTimeUsed = getInitialTime(difficulty) - timer;
    navigation.navigate("ResultScreen", {
      levelNumber,
      category,
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions: questions.length,
      timeUsed: totalTimeUsed,
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.activityIndicator,
          styles.loadingStyle,
        ]}
      >
        <Text style={styles.loadingText}>
          Getting your questions ready, please wait...
        </Text>
        <ActivityIndicator size="large" color="#614BF2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GameUI
        route={route}
        question={
          questions[currentQuestionIndex]?.question
            ? decodeURIComponent(questions[currentQuestionIndex].question)
            : ""
        }
        // style = {}
        currentquestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timer={formatTime(timer)}
        OnPressNext={handleNextPress}
        options={options}
        onPressOption={handleSelectedOption}
        OnPressBack={handleBackPress}
        ShowResult={handleResultPress}
      />

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
          navigation.goBack();
        }}
        onDismiss={() => {
          setShowAlert(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default GameInterface;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    justifyContent: "center",
  },
  loadingStyle: {
    backgroundColor: Colors.light.primary200,
    padding: 10,
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold",
    color: "#614BF2",
    textAlign: "center",
  },
});

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { DirectingArrowUp, Exams, ProblemSolving } from '../assets/OnboardingImages/index';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('SignUp');
  };

  const doneButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.doneButton}>
      <Text style={styles.doneText}>SIGN UP</Text>
    </TouchableOpacity>
  );

  const skipButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.skipButton}>
      <Text style={styles.skipText}>SKIP</Text>
    </TouchableOpacity>
  );

  const nextButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.nextButton}>
      <Text style={styles.nextText}>NEXT</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient colors={['#F7F8FF', '#EFF0F3']} style={styles.gradient} />
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        SkipButtonComponent={skipButton}
        NextButtonComponent={nextButton}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#EFF1FF',
            image: <Exams style={styles.onboardingImage} />,
            title: <Text style={styles.title}>Get Ready to Test Your Knowledge!</Text>,
            subtitle: <Text style={styles.subtitle}>Embark on an exciting journey through various categories and levels of quizzes. Challenge yourself and have fun while learning!</Text>,
          },
          {
            backgroundColor: '#EFF1FF',
            image: <ProblemSolving style={styles.onboardingImage} />,
            title: <Text style={styles.title}>Choose Your Challenge</Text>,
            subtitle: <Text style={styles.subtitle}>Explore different categories and select your preferred difficulty level. Are you ready to take on the challenge?</Text>,
          },
          {
            backgroundColor: '#EFF1FF',
            image: <DirectingArrowUp style={styles.onboardingImage} />,
            title: <Text style={styles.title}>Level Up Your Learning</Text>,
            subtitle: <Text style={styles.subtitle}>With each level, your knowledge grows. Progress through the ranks, unlock achievements, and become a Quizfinity master!</Text>,
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2FF',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  onboardingImage: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 14,
    width: '70%',
    backgroundColor: '#554DC2',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  doneText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
  skipButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  skipText: {
    color: '#614bf2',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  nextButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nextText: {
    color: '#614bf2',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    color: '#614bf2',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

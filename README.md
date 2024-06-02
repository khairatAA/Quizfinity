<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,typescript,firebase,expo" />
  </a>
</p>

<h1 align="center">Quizfinity(A Quiz App)</h1>

<p align="center">
  <img src="./assets/README_images/logo.png" alt="Quizfinity_logo" height="200">
</p>

## Introduction

Welcome to Quifinity! **[Quizfinity](https://quizfinity-showcase.vercel.app/)** is a mobile application designed to combine learning with fun through quizzes and trivia questions on various topics such as Technology, Science, Nature, Riddles, Literacy, and more. The app is suitable for users of all age groups, making it a versatile tool for education and entertainment.

## Key Features (MVP)

### Splash Screen

<p align="center">
  <img src="./assets/README_images/SplashScreen.png" alt="SplashScreen" height="300">
</p>
- <b>Logo Display</b>: The app's logo is displayed upon loading.

### Onboarding

<p align="center">
  <img src="./assets/README_images/Onboarding1.png" alt="SplashScreen" height="300">
  <img src="./assets/README_images/Onboarding2.png" alt="SplashScreen" height="300">
  <img src="./assets/README_images/Onboarding3.jpeg" alt="SplashScreen" height="300">
</p>
- <b>Three-Page Slider</b>:  Introduces users to the app and its features, highlighting reasons to use Quizfinity.

### Authentication

<p align="center">
  <img src="./assets/README_images/SignUp.jpeg" alt="SplashScreen" height="300">
  <img src="./assets/README_images/Login.jpeg" alt="SplashScreen" height="300">
</p>
- <b>Email and Password:</b>  Users can register and log in using their email addresses and passwords.

### Home Screen

<p align="center">
  <img src="./assets/README_images/Home.jpeg" alt="SplashScreen" height="300">
</p>
- <b>Category Cards:</b>  Each category is displayed in a card were a user can select any category.
- <b>User's Rank:</b>  Displays the User's rank on the leaderboard.
- <b>User's Points:</b>  Displays the total points the user has earned.

### Quiz Screen

<p align="center">
  <img src="./assets/README_images/InstructionScreen.jpeg" alt="SplashScreen" height="300">
  <img src="./assets/README_images/GameScreen.jpeg" alt="SplashScreen" height="300">
  <img src="./assets/README_images/Result.jpeg" alt="SplashScreen" height="300">
</p>
- <b>Question Display:</b> Shows the quiz question with 4 or 5 options.
- <b>Timer: </b> Displays a countdown timer for the level:
    - Easy: 10 minutes per level
    - Medium: 8 minutes per level
    - Hard: 5 minutes per level
- <b>Post-Quiz:</b> After time elapses or the user submits their answers:
    - Shows a "quiz over" screen indicating pass/fail status
    - Allows progression to the next level if passed, or retrying the level if failed
    - After completing all levels in a mode, a success page is displayed with an option to return to the list of modes.

## Technologies Used

### Frontend

- React Native
- TypeScript

### Backend / Database / Authentication

- Firebase

### External Database for Questions

- Open Trivia DB

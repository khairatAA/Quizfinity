import { Art, Entertainment, History, Nature, Science, Technology } from "../../assets/QuizCategoriesImages"


export const quizCategoriesArray = [
    {
      id: 0,
      name: 'Technology',
      image: <Technology width={160} height={120} />,
      numberOfLevels: 5,
      onPress: () => {
        // Functionality for when Category 1 is pressed
        console.log('Clicked');
      }
    },
    {
      id: 1,
      name: 'Science',
      image: <Science width={160} height={120} />,
      numberOfLevels: 5,
      onPress: () => {
        // Functionality for when Category 2 is pressed
        console.log('Clicked');
      }
    },
    {
        id: 2,
        name: 'Entertainment',
        image: <Entertainment width={160} height={120} />,
        numberOfLevels: 5,
        onPress: () => {
          // Functionality for when Category 2 is pressed
          console.log('Clicked');
        }
    },
    {
        id: 3,
        name: 'Art',
        image: <Art width={160} height={120} />,
        numberOfLevels: 5,
        onPress: () => {
          // Functionality for when Category 2 is pressed
          console.log('Clicked');
        }
    },
    {
        id: 4,
        name: 'Geography',
        image: <Nature width={160} height={120} />,
        numberOfLevels: 5,
        onPress: () => {
          // Functionality for when Category 2 is pressed
          console.log('Clicked');
        }
    },
    {
        id: 5,
        name: 'History',
        image: <History width={160} height={120} />,
        numberOfLevels: 5,
        onPress: () => {
          // Functionality for when Category 2 is pressed
          console.log('Clicked');
        }
      },
];
  
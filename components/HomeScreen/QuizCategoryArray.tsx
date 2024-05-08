import { Art, Entertainment, History, Nature, Science, Technology } from "../../assets/QuizCategoriesImages"


export const quizCategoriesArray = [
    {
      id: 0,
      name: 'Technology',
      image: <Technology width={160} height={120} />,
      numberOfLevels: 5,
      levelDetails: [
        {
          id: 0,
          level_number: 1,
        },
        {
          id: 1,
          level_number: 2,
        },
        {
          id: 2,
          level_number: 3,
        },
        {
          id: 3,
          level_number: 4,
        },
        {
          id: 4,
          level_number: 5,
        }
      ]
    },
    {
      id: 1,
      name: 'Science',
      image: <Science width={160} height={120} />,
      numberOfLevels: 5,
      levelDetails: [
        {
          id: 0,
          level_number: 1,
        }
      ]
    },
    {
        id: 2,
        name: 'Entertainment',
        image: <Entertainment width={160} height={120} />,
        numberOfLevels: 5,
        levelDetails: [
          {
            id: 0,
            level_number: 1,

          }
        ]
    },
    {
        id: 3,
        name: 'Art',
        image: <Art width={160} height={120} />,
        numberOfLevels: 5,
        levelDetails: [
          {
            id: 0,
            level_number: 1,

          }
        ]
    },
    {
        id: 4,
        name: 'Geography',
        image: <Nature width={160} height={120} />,
        numberOfLevels: 5,
        levelDetails: [
          {
            id: 0,
            level_number: 1,

          }
        ]
    },
    {
        id: 5,
        name: 'History',
        image: <History width={160} height={120} />,
        numberOfLevels: 5,
        levelDetails: [
          {
            id: 0,
            level_number: 1,

          }
        ]
      },
];
  
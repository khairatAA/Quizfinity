import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { Art, Entertainment, History, Nature, Science, Technology } from '../../assets/QuizCategoriesImages';

const QuizLevelHeader = ({ route }: any) => {
    const { category, numberOfLevels } = route.params;
    const navigation = useNavigation()

    const handleNavigationToHome = () => {
        navigation.goBack()
    }

    const imageComponent = getImageSource(category);

  return (
    <View style = {styles.container}>
        <TouchableOpacity onPress={handleNavigationToHome}>
            <AntDesign name="left" size={24} color={`#1E1F24`} />
        </TouchableOpacity>
        <View style={styles.categoryInfo}>
            <View style={styles.categoryText}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryLevel}>{numberOfLevels} Levels</Text>
            </View>
            <View>
                {imageComponent}
            </View>
        </View>
    </View>
  )
}

export default QuizLevelHeader

const getImageSource = (imageName: string) => {
    switch (imageName) {
        case 'Technology':
            return <Technology width={100} height={80} />;
        case 'Science':
            return <Science width={100} height={80} />;
        case 'Entertainment':
            return <Entertainment width={100} height={80} />;
        case 'Art':
            return <Art width={100} height={80} />;
        case 'Geography':
            return <Nature width={100} height={80} />;
        case 'History':
            return <History width={100} height={80} />;
        default:
            return null;
    }
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    categoryText: {
        gap: 5
    },
    categoryName: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
    },
    categoryLevel: {
        color: '#62636C',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
    }
})

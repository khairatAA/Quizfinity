import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { quizCategoriesArray } from './QuizCategoryArray'
import Colors from '../../constants/Colors';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const QuizCategories = () => {

    const renderItem = ({ item }: any) => {

        return(
            <TouchableOpacity key={item.id} onPress={item.onPress} style={styles.categoryContainer}>
                <Animated.View entering={FadeInUp.springify(5000)} style={styles.CategoryImage}>
                    {item.image}
                </Animated.View>
                <View style={styles.CategoryTexts}>
                    <Text style={styles.CategoryName}>{item.name}</Text>
                    <Text style={styles.CategoryLevel}>{item.numberOfLevels} Levels</Text>
                </View>
            </TouchableOpacity>
        )
    };
    
  return (
    <View style={styles.container}>
        <Text style={styles.LetPlay}>Let's Play</Text>
        <FlatList
            data={quizCategoriesArray}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.categoriesContainer}
            numColumns={2}
        />
    </View>
  )
}

export default QuizCategories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
    },
    CategoryImage:{
        alignSelf: 'center',
        position: 'relative',
        top: -35,
    },
    LetPlay: {
        paddingHorizontal: 20,
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
    },
    categoriesContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 100
    },
    categoryContainer: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: Colors.light.primary100,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 5,
    },
    CategoryTexts: {
        gap: 5,
    },
    CategoryName: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
    },
    CategoryLevel: {
        color: '#62636C',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
    }
    
})
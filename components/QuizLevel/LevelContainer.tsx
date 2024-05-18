import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LevelContainerUI from './LevelContainerUI'
import Animated, { FadeInDown, FadeInUp, ZoomInLeft } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const LevelContainer = ({ route }: any) => {
    const { levelDetails, category } = route.params;
    const navigation = useNavigation()

    const renderItem = ({ item }: any) => (
      <Animated.View entering={ZoomInLeft.duration(1000).delay(300 * item.id)}>
          <LevelContainerUI levelName={item.level_number} onPress={() => {
            navigation.navigate('QuizInstruction', {levelNumber: item.level_number, category: category, levelDetails: levelDetails});
          }} />
      </Animated.View>
      );

  return (
    <FlatList
        data={levelDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default LevelContainer

const styles = StyleSheet.create({})
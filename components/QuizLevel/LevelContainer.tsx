import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LevelContainerUI from './LevelContainerUI'

const LevelContainer = ({ route }: any) => {
    const { category, levelDetails } = route.params;

    console.log('Category: ', category);
    console.log('Level Details: ', levelDetails);
    

    const renderItem = ({ item }: any) => (
        <View style={{gap:20}}>
            <LevelContainerUI levelName={item.level_number} />
        </View>
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
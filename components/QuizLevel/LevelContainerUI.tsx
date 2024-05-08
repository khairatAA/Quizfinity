import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

type LevelContainerUIType = {
  onPress?: any;
  levelName?: any;
}

const LevelContainerUI = ({onPress, levelName}: LevelContainerUIType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{levelName}</Text>
      <AntDesign name="right" size={24} color={`#1E1F24`} />
    </TouchableOpacity>
  )
}

export default LevelContainerUI

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelcontainerUI: {

  }
})

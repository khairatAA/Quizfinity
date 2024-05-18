import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type LevelContainerUIType = {
  onPress?: any;
  levelName?: any;
}

const LevelContainerUI = ({onPress, levelName}: LevelContainerUIType) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.levelcontainerUI}>
        <Text style={styles.levelName}>Level {levelName}</Text>
        <AntDesign name="right" size={24} color={`#1E1F24`} />
      </View>
    </TouchableOpacity>
  )
}

export default LevelContainerUI

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.light.primary100,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2.5,
  },
  levelcontainerUI: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  levelName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  }
})

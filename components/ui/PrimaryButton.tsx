import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type PrimaryButtonTypes = {
  ButtonText: String;
  onPress: any;
  style?: any
}
const PrimaryButton = ({ ButtonText, onPress, style }: PrimaryButtonTypes) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} >
      <Text style={styles.ButtonText}>{ButtonText}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#614BF2',
    padding: 15,
    borderRadius: 20,
    // elevation: 3,
    // shadowOpacity: 0.2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3
  },
  ButtonText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.light.primary100,
  }
})

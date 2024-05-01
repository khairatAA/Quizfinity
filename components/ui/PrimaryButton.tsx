import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type PrimaryButtonTypes = {
  ButtonText: String;
  onPress: any
}
const PrimaryButton = ({ButtonText, onPress}: PrimaryButtonTypes) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
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
    elevation: 8,
    shadowOpacity: 0.2,
  },
  ButtonText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.light.primary100,
  }
})

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type TextInputInterfaceType ={
    children: any;
    fieldName: string;
    style?: any;
}

const TextInputInterface = ({ children, fieldName, style }: TextInputInterfaceType) => {
  return (
    <View style={styles.container}>
        <Text style={styles.fieldName}>{fieldName}</Text>
        <View style={[styles.TextInput, style]}>
            {children}
        </View>
    </View>
  )
}

export default TextInputInterface

const styles = StyleSheet.create({
    container: {
        gap: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    fieldName: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        paddingLeft: 10,
        color: '#1E1F24',
    },
    TextInput: {
        padding: 15,
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#E0E1E6',
        borderWidth: 1,
        borderColor: '#E0E1E6'
    }
})

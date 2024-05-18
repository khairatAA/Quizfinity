import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ResultDetailTypes = {
    value?: any;
    title?: any;
    bulletStyle?: any;
}

const ResultDetail = ({value, title, bulletStyle}: ResultDetailTypes) => {
  return (
    <View style={styles.container}>
        <Text style={[bulletStyle, styles.bulletStyle]}>•</Text>
        <View style={styles.details}>
            <Text style={[styles.value,bulletStyle]}>{value}</Text>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
  )
}

export default ResultDetail

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap: 5,
        alignItems: 'flex-start',
        margin:10,
    },
    details: {
        gap: 5
    },
    bulletStyle:{
        fontSize: 20
    },
    value: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: 'black'
    }
})
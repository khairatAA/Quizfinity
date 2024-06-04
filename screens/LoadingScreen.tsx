import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color='#614BF2' size="large" />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.primary200,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
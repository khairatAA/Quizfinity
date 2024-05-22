import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Colors from '../../constants/Colors'
import { Podium } from '../../assets/icons'
import { SearchFeature } from './SearchFeature'

const LeaderboardUI = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />

            <View style={styles.leaderboardTitle}>
                <Podium height={100} width={100} />
                <Text style={styles.titleText}>Leaderboard</Text>
            </View>

            <View style={styles.UsersList}>
                <SearchFeature />
            </View>
        </SafeAreaView>
    )
}

export default LeaderboardUI

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#614BF2',
        width: '100%'
    },
    leaderboardTitle: {
        backgroundColor: '#614BF2',
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    UsersList: {
        backgroundColor: Colors.light.primary100,
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 25,
        paddingTop: 40,
        flex: 1,
        justifyContent: 'space-between',
    },
    titleText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 40,
        color: Colors.light.primary100,
        alignSelf: 'center',
    },
})
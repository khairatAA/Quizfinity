import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LeaderboardEntry } from './SearchFeature'
import Animated, { FadeInDown, FadeInUp, ZoomInLeft } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type SearchFilterType = {
    leaderboard: Array<LeaderboardEntry>;
    input: string;
    setInput: any;
    noResults: boolean;
}

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

const SearchFilter = ({ leaderboard, input, setInput, noResults }: SearchFilterType) => {

    const filteredData = input === "" ? leaderboard : leaderboard.filter(item => item.username.toLowerCase().includes(input.toLowerCase()));

    const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
        <Animated.View entering={ZoomInLeft.duration(1000).delay(300 * index)} style={styles.container}>
            <Text style={styles.text}>{index + 1}</Text>
            <View style={styles.childContainer}>
                <View style={styles.headerUserIcon}>
                    {item.profilePictureUrl && isValidUrl(item.profilePictureUrl) ? (
                        <Image
                            source={{ uri: item.profilePictureUrl }}
                            style={styles.profilePicture}
                        />
                    ) : (
                        <AntDesign name="user" size={28} color={`${Colors.light.primary100}`} />
                    )}
                </View>
                <Text style={styles.text}>
                    {item.username ? item.username.substring(0, 10) + (item.username.length > 10 ? '...' : '') : `Unknown${index + 1}`}
                </Text>
            </View>
            <Text style={[styles.text, styles.spacing]}>{item.totalPoints}</Text>
        </Animated.View>
    );

    return (
        <View>
            {noResults || (input !== "" && filteredData.length === 0) ? (
                <Text style={styles.noResultsText}>No results found.</Text>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.userId}
                />
            )}
        </View>
    )
}

export default SearchFilter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.light.primary200,
        marginBottom: 20,
        borderRadius: 12,
        width: '100%',
        gap: 30,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2.5,
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerUserIcon: {
        width: 50,
        height: 50,
        borderRadius: 200,
        backgroundColor: '#614BF2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        justifyContent: 'space-between'
    },
    spacing: {
        textAlign: 'right',
        marginRight: 4
    },
    text: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
    }
})
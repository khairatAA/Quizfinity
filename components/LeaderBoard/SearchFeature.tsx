import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, AntDesign } from '@expo/vector-icons';
import SearchFilter from './SearchFilter';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export type LeaderboardEntry = {
    userId: string;
    username: string;
    totalPoints: number;
    profilePictureUrl: string | null;
};

const SearchFeature = () => {
    const [input, setInput] = useState("")
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleScoreRetrieval = async () => {
        setLoading(true);
        setNoResults(false);

        try {
            const usersQuery = query(collection(FIREBASE_DB, 'users'));
            const usersSnapshot = await getDocs(usersQuery);
            let leaderboardData = [];

            for (const userDoc of usersSnapshot.docs) {
                const userId = userDoc.id;
                const userData = userDoc.data();
                const username = userData.username;
                const profilePictureUrl = userData.profilePictureUrl;

                const categoriesSnapshot = await getDocs(collection(FIREBASE_DB, 'users', userId, 'game_categories'));
                let totalPoints = 0;

                categoriesSnapshot.forEach(categoryDoc => {
                    const categoryData = categoryDoc.data();
                    const categoryPoints = Object.values(categoryData).reduce((acc, curr) => acc + curr, 0);
                    totalPoints += categoryPoints;
                });

                leaderboardData.push({ userId, username, totalPoints, profilePictureUrl });
            }

            leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);
            setLeaderboard(leaderboardData);
            setLoading(false);

            if (leaderboardData.length === 0) {
                setNoResults(true);
            }
        } catch (error) {
            console.log('Error fetching leaderboard data:', error);
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            handleScoreRetrieval()
        }, [])
    );

    const handleCancelSearch = () => {
        setInput("");
        setNoResults(false);
    }

    return (
        <View style={styles.parentContainer}>
            <View style={styles.container}>
                <Feather
                    name='search'
                    size={20}
                    color='#614BF2'
                    style={styles.icon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search by username...'
                    autoCapitalize='none'
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                {input.length > 0 && (
                    <TouchableOpacity onPress={handleCancelSearch} style={styles.cancelButton}>
                        <AntDesign name="closecircle" size={20} color="#614BF2" />
                    </TouchableOpacity>
                )}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#614BF2" />
            ) : (
                <SearchFilter leaderboard={leaderboard} input={input} setInput={setInput} noResults={noResults} />
            )}
        </View>
    )
}

export default SearchFeature

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        gap: 30,
    },
    container: {
        padding: 16,
        flexDirection: 'row',
        width: "100%",
        backgroundColor: '#E0E1E6',
        borderRadius: 12,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10
    },
    icon: {
        marginLeft: 1,
        marginRight: 4,
    },
    searchInput: {
        fontSize: 16,
        flex: 1,
        fontFamily: 'OpenSans-Regular',
    },
    cancelButton: {
        marginLeft: 5,
    }
})
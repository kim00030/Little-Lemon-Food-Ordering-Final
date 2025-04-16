
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { fetchMenuItems } from '../services/menuService';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMenu = async () => {
            const data = await fetchMenuItems();
            setMenu(data);
            setLoading(false);
        };
        loadMenu();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <ScrollView style={styles.container}>
            {/* Top Bar (no padding) */}
            <View style={styles.topBar}>
                {/* Left spacer */}
                <View style={{ flex: 1 }} />

                {/* Centered logo */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>

                {/* Right profile */}
                <Pressable onPress={() => navigation.navigate('Profile')} style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
                </Pressable>
            </View>

            {/* Other content goes below (with padding in their section) */}
            {/* Ex: HeroBanner, FilterRow, MenuList */}

            <View style={styles.banner}>
                <View style={styles.bannerTextSection}>
                    <Text style={styles.bannerTitle}>Little Lemon</Text>

                    <View style={styles.bannerRow}>
                        <View style={{ width: '66%' }}>
                            <Text style={styles.bannerSubtitle}>Chicago</Text>
                            <Text style={styles.bannerDescription}>
                                We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.
                            </Text>
                        </View>

                        <Image
                            source={require('../assets/hero_image.png')}
                            style={styles.heroImage}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>

    );
}

export default HomeScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 32,
            paddingBottom: 12,
            paddingHorizontal: 16,
            backgroundColor: '#fff',

        },

        logo: {
            height: 50,
            resizeMode: 'contain',
        },

        profileIcon: {
            width: 36,
            height: 36,
            borderRadius: 18,
            resizeMode: 'cover',

        },

        banner: {
            backgroundColor: '#495E57',
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        bannerTextSection: {
            flex: 1,
            paddingRight: 12,
        },

        bannerTitle: {
            color: '#F4CE14',
            fontSize: 28,
            fontWeight: 'bold',
        },

        bannerSubtitle: {
            color: 'white',
            fontSize: 24,
            fontWeight: '600',
            marginTop: -8,
            marginBottom: 12, 

        },

        bannerDescription: {
            color: 'white',
            fontSize: 14,
            marginTop: 0,
            marginEnd: 15,
            lineHeight: 18,
        },

        bannerRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 8,
        },

        heroImage: {
            width: 110,
            height: 130,
            borderRadius: 12,
            resizeMode: 'cover',
            marginTop: 10

        }
    }
)

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { fetchMenuItems } from '../services/menuService';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    // set categries clips
    const categories = [...new Set(menu.map(item =>
        item.category.charAt(0).toUpperCase() + item.category.slice(1)
    ))];

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

    const filteredMenu = menu.filter((item) => {
        const matchesCategory =
            !selectedCategory || item.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
            !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

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

            {/* HeroBanner */}
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

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={18} color="#333" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Enter search phrase"
                            placeholderTextColor="#888"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                if (text.length > 0) {
                                    setSelectedCategory(null);
                                }
                            }}
                        />
                    </View>

                </View>
            </View>
            {/* Categries chips */}
            <View style={styles.categorySection}>
                <Text style={styles.categoryHeader}>ORDER FOR DELIVERY!</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                >
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category;

                        return (
                            <Pressable
                                key={category}
                                onPress={() => {
                                    const newSelection = selectedCategory === category ? null : category;
                                    setSelectedCategory(newSelection);
                                    if (newSelection) {
                                        setSearchQuery(''); //clear search input
                                    }
                                }}
                                style={[
                                    styles.categoryChip,
                                    {
                                        backgroundColor: isSelected ? '#495E57' : '#EDEFEE',
                                    },
                                ]}>

                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        color: isSelected ? 'white' : '#495E57',
                                        fontSize: 14,
                                    }}
                                >
                                    {category}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: '#ccc', marginHorizontal: 16, marginTop: 12 }} />

                {/* Menu items */}
                <View style={styles.menuSection}>
                    {filteredMenu.map((item) => (
                        <View key={item.id} style={styles.menuItem}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuDescription} numberOfLines={2}>{item.description}</Text>
                                <Text style={styles.menuPrice}>${Number(item.price).toFixed(2)}</Text>
                            </View>
                            <Image source={{ uri: item.image }} style={styles.menuImage} />
                        </View>
                    ))}
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
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'MarkaziText',
        },

        bannerSubtitle: {
            color: 'white',
            fontSize: 28,
            fontWeight: '600',
            marginTop: -8,
            marginBottom: 12,
            fontFamily: 'MarkaziText',

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

        },

        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 22,
            paddingHorizontal: 10,
            height: 40,
        },

        searchIcon: {
            marginRight: 8,
        },

        searchInput: {
            flex: 1,
            fontSize: 14,
            color: '#000',
        },

        // categories chips
        categorySection: {
            paddingHorizontal: 16,
            paddingTop: 24,
        },

        categoryHeader: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 12
        },

        categoryList: {
            flexDirection: 'row',
            gap: 12,
        },

        categoryChip: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 24,
        },
        // Menu items
        menuSection: {
            paddingHorizontal: 16,
            marginTop: 20,
            paddingBottom: 32,
            gap: 16,
        },

        menuItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
        },

        menuTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 4,
        },

        menuDescription: {
            fontSize: 14,
            color: '#666',
            marginBottom: 4,
        },

        menuPrice: {
            fontSize: 14,
            color: '#888',
        },

        menuImage: {
            width: 80,
            height: 80,
            borderRadius: 8,
            resizeMode: 'cover',
        },

    }
)
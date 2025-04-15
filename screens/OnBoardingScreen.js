import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';

const OnBoardingScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        // Handle registration logic
    };

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={styles.container}>
                    {/* Logo */}
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo} />

                    {/* Banner */}
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>Let's get to know you</Text>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.formTitle}>Personal Information</Text>

                        <Text style={styles.inputLabel}>First name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <Text style={styles.inputLabel}>Last name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Last name"
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>


                    {/* Register Button */}
                    <View style={styles.buttonWrapper}>
                        <Pressable style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </Pressable>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>


    );
};

export default OnBoardingScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 80,
        marginTop: 20,
        alignSelf: 'center',
        resizeMode: "contain"
    },

    banner: {
        width: '100%',
        height: 100,
        backgroundColor: '#495E57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    formSection: {
        paddingHorizontal: 20,
        paddingTop: 40,

    },
    formTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
        marginTop: 8,
    },

    buttonWrapper: {
        marginTop: 'auto',
        padding: 20,
    },
    button: {
        backgroundColor: '#F4CE14',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import TopBar from '../components/TopBar';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (stored) {
        setUserData(JSON.parse(stored));
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    await AsyncStorage.removeItem(STORAGE_KEYS.IS_REGISTERED);

    navigation.reset({
      index: 0,
      routes: [{ name: 'OnBoard' }],
    });
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Personal information</Text>

        <Text style={styles.label}>First name</Text>
        <TextInput
          value={userData.firstName}
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}/>

        <Text style={styles.label}>Last name</Text>
        <TextInput
          value={userData.lastName}
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}/>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={userData.email}
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}/>

        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff', // white background
    color: '#666',
  },
  buttonWrapper: {
    marginTop: 40,
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

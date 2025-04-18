import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from './screens/OnBoardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { STORAGE_KEYS } from './constants/storageKeys';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Karla: require('./assets/fonts/karla_regular.ttf'),
    MarkaziText: require('./assets/fonts/markazi_text_regular.ttf'),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        //Check if user is registered previously
        const flag = await AsyncStorage.getItem(STORAGE_KEYS.IS_REGISTERED);
        setIsRegistered(flag === 'true');
      } catch (e) {
        console.log('Error reading user info:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }



  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isRegistered ? 'Home' : 'OnBoard'}>
        <Stack.Screen name='OnBoard' component={OnBoardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
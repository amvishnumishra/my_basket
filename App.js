import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds splash screen
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      {isLoading ? <SplashScreen /> : <HomeScreen />}
    </View>
  );
}

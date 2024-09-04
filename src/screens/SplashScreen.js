// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    SplashScreen.hide(); // Hide the native splash screen after the React component mounts

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./../assets/logo.png')} // Replace with your logo
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Text style={styles.title}>Welcome to MyApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Background color
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Splash;

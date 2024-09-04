import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AppScreen');
    }, 3000); // 3 seconds splash screen
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logo.png')} style={styles.image} />
      <Text style={styles.text}>Welcome to MyBasket</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

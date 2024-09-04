import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Button title="Phone" onPress={() => navigation.navigate('PhoneLoginScreen')} />
      <Button title="Email" onPress={() => {/* handle email login */}} />
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity onPress={() => {/* handle Google login */}}>
          <Icon name="google" size={40} color="#db4437" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* handle Facebook login */}}>
          <Icon name="facebook" size={40} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* handle Twitter login */}}>
          <Icon name="twitter" size={40} color="#1da1f2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

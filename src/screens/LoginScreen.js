import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [loginType, setLoginType] = useState('phone');
  const [input, setInput] = useState('');

  const handleLogin = () => {
    if (loginType === 'phone') {
      sendOTP(input);
    } else {
      loginWithEmail(input);
    }
  };

  const sendOTP = async (phone) => {
    try {
      await axios.post('https://api.gupshup.io/sms/send', {
        // Gupshup API payload
      });
      navigation.navigate('OTP', { loginType, input });
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithEmail = async (email) => {
    try {
      navigation.navigate('Profile', { email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder={loginType === 'phone' ? 'Enter Phone Number' : 'Enter Email'}
        value={input}
        onChangeText={setInput}
        keyboardType={loginType === 'phone' ? 'phone-pad' : 'email-address'}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Switch to Email Login" onPress={() => setLoginType('email')} />
      <Button title="Switch to Phone Login" onPress={() => setLoginType('phone')} />
    </View>
  );
}

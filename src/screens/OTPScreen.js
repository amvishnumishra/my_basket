import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

export default function OTPScreen({ route, navigation }) {
  const { loginType, input } = route.params;
  const [otp, setOTP] = useState('');

  const verifyOTP = async () => {
    try {
      const response = await axios.post('https://api.gupshup.io/sms/verify', {
        // OTP verification payload
      });
      if (response.data.verified) {
        if (loginType === 'phone') {
          navigation.navigate('Profile', { phone: input });
        } else {
          navigation.navigate('Home');
        }
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Enter the OTP sent to your {loginType}</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOTP}
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={verifyOTP} />
    </View>
  );
}

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function ProfileScreen({ route, navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(route.params?.email || '');
  const [phone, setPhone] = useState(route.params?.phone || '');

  const handleProfileCompletion = async () => {
    try {
      await axios.post('https://api.your-email-service.com/send-otp', {
        email,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Enter Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Enter Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Enter Phone" value={phone} onChangeText={setPhone} />
      <Button title="Complete Profile" onPress={handleProfileCompletion} />
    </View>
  );
}

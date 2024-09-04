import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NeuView } from 'neumorphism-ui';

export default function AppScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [viewState, setViewState] = useState('app'); // 'app', 'login', 'phone', 'email', 'create', 'verifyPhoneOtp', 'verifyEmailOtp', 'home'
  const [history, setHistory] = useState(['app']); // Track screen history

  // State for login and create account screens
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);

  useEffect(() => {
    if (isSplashVisible) {
      setTimeout(() => setIsSplashVisible(false), 3000); // 3 seconds splash screen
    }
  }, [isSplashVisible]);

  const handleSendOtp = () => {
    // Logic to send OTP
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Logic to verify OTP
    setViewState('home');
  };

  const handleSubmitCreate = () => {
    if (phoneNumber) {
      setIsOtpSent(true);
      setViewState('verifyPhoneOtp');
    } else if (email) {
      setIsEmailOtpSent(true);
      setViewState('verifyEmailOtp');
    } else {
      // If neither phone nor email is provided, do not proceed
      alert("Phone or Email is required.");
    }
  };

  const navigateTo = (screen) => {
    setHistory([...history, screen]);
    setViewState(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setViewState(newHistory[newHistory.length - 1]);
    }
  };

  const goHome = () => {
    setHistory(['app']);
    setViewState('app');
  };

  const renderBackButton = () => (
    <TouchableOpacity style={styles.backButton} onPress={goBack}>
      <Icon name="arrow-left" size={20} color="#000" />
    </TouchableOpacity>
  );

  const renderHomeButton = () => (
    <TouchableOpacity style={styles.homeButton} onPress={goHome}>
      <Icon name="home" size={20} color="#000" />
    </TouchableOpacity>
  );

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./../assets/logo.png')} style={styles.splashImage} />
        <Text style={styles.splashText}>Welcome to MyBasket</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {viewState !== 'app' && renderBackButton()}
      {viewState !== 'app' && renderHomeButton()}
      {viewState === 'app' && (
        <>
          <View style={styles.section}>
            <View style={styles.logoContainer}>
              <Image source={require('./../assets/logo.png')} style={styles.logoImage} />
            </View>
            <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
              <TouchableOpacity onPress={() => navigateTo('login')}>
                <Text style={styles.neuButtonText}>Log In</Text>
              </TouchableOpacity>
            </NeuView>
            <Text>Or</Text>
            <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
              <TouchableOpacity onPress={() => navigateTo('create')}>
                <Text style={styles.neuButtonText}>Create Account</Text>
              </TouchableOpacity>
            </NeuView>
          </View>
        </>
      )}

      {viewState === 'login' && (
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <Image source={require('./../assets/logo.png')} style={styles.logoImage} />
          </View>
          <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('phone')}>
              <Text style={styles.neuButtonText}>Phone</Text>
            </TouchableOpacity>
          </NeuView>
          <Text>Or</Text>
          <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('email')}>
              <Text style={styles.neuButtonText}>Email</Text>
            </TouchableOpacity>
          </NeuView>
          <Text>Or</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Google login */ }}>
              <Icon name="google" size={20} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Facebook login */ }}>
              <Icon name="facebook" size={20} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Twitter login */ }}>
              <Icon name="twitter" size={20} color="#1da1f2" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {viewState === 'phone' && (
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <Image source={require('./../assets/logo.png')} style={styles.logoImage} />
          </View>
          <NeuView color="#adb9ba" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </NeuView>
          {!isOtpSent ? (
            <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
              <TouchableOpacity onPress={handleSendOtp}>
                <Text style={styles.neuButtonText}>Get OTP</Text>
              </TouchableOpacity>
            </NeuView>
          ) : (
            <>
              <NeuView color="#adb9ba" width="100%" height={60} borderRadius={16} concave>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />
              </NeuView>
              <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
                <TouchableOpacity onPress={handleVerifyOtp}>
                  <Text style={styles.neuButtonText}>Verify</Text>
                </TouchableOpacity>
              </NeuView>
            </>
          )}
        </View>
      )}

      {viewState === 'email' && (
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <Image source={require('./../assets/logo.png')} style={styles.logoImage} />
          </View>
          <NeuView color="#adb9ba" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </NeuView>
          <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('home')}>
              <Text style={styles.neuButtonText}>Login</Text>
            </TouchableOpacity>
          </NeuView>
        </View>
      )}

      {viewState === 'create' && (
        <View style={styles.section}>
          <Text style={styles.title}>Create Account</Text>
          <NeuView color="#adb9ba" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </NeuView>
          <NeuView color="#adb9ba" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Phone (Required)"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </NeuView>
          <NeuView color="#adb9ba" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Email (Required)"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </NeuView>
          <NeuView color="#adb9ba" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={handleSubmitCreate}>
              <Text style={styles.neuButtonText}>Create Account</Text>
            </TouchableOpacity>
          </NeuView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Splash screen background color
  },
  splashImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#d1ddde', // Other screens background color
    padding: 16,
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
      paddingTop: '15%',
      paddingBottom: '85%',
  },
  logoImage: {
    width: 180,
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  homeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    padding: 16,
    fontSize: 16,
    color: '#000',
  },
  neuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 60,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    elevation: 2,
  },
});


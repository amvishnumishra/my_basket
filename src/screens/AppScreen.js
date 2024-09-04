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
          <Text style={styles.title}>My Basket</Text>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('login')}>
              <Text style={styles.neuButtonText}>Log In</Text>
            </TouchableOpacity>
          </NeuView>
          <Text>Or</Text>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('create')}>
              <Text style={styles.neuButtonText}>Create Account</Text>
            </TouchableOpacity>
          </NeuView>
        </>
      )}

      {viewState === 'login' && (
        <View style={styles.section}>
          <Text style={styles.title}>Log In</Text>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('phone')}>
              <Text style={styles.neuButtonText}>Phone</Text>
            </TouchableOpacity>
          </NeuView>
          <Text>Or</Text>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('email')}>
              <Text style={styles.neuButtonText}>Email</Text>
            </TouchableOpacity>
          </NeuView>
          <Text>Or</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Google login */}}>
              <Icon name="google" size={20} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Facebook login */}}>
              <Icon name="facebook" size={20} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Twitter login */}}>
              <Icon name="twitter" size={20} color="#1da1f2" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {viewState === 'phone' && (
        <View style={styles.section}>
          <Text style={styles.title}>Phone Login</Text>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
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
            <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
              <TouchableOpacity onPress={handleSendOtp}>
                <Text style={styles.neuButtonText}>Get OTP</Text>
              </TouchableOpacity>
            </NeuView>
          ) : (
            <>
              <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />
              </NeuView>
              <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
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
          <Text style={styles.title}>Email Login</Text>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </NeuView>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('home')}>
              <Text style={styles.neuButtonText}>Login</Text>
            </TouchableOpacity>
          </NeuView>
        </View>
      )}

      {viewState === 'create' && (
        <View style={styles.section}>
          <Text style={styles.title}>Create Account</Text>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </NeuView>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Phone (Required)"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </NeuView>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Email (Optional)"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </NeuView>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={handleSubmitCreate}>
              <Text style={styles.neuButtonText}>Submit</Text>
            </TouchableOpacity>
          </NeuView>
          <Text></Text>
          <Text>Or</Text>
          <View style={styles.socialLoginContainer}>
                      <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Google login */}}>
                        <Icon name="google" size={20} color="#db4437" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Facebook login */}}>
                        <Icon name="facebook" size={20} color="#3b5998" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton} onPress={() => {/* handle Twitter login */}}>
                        <Icon name="twitter" size={20} color="#1da1f2" />
                      </TouchableOpacity>
              </View>
        </View>
      )}

      {viewState === 'verifyPhoneOtp' && (
        <View style={styles.section}>
          <Text style={styles.title}>Verify Phone OTP</Text>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
          </NeuView>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={handleVerifyOtp}>
              <Text style={styles.neuButtonText}>Verify</Text>
            </TouchableOpacity>
          </NeuView>
        </View>
      )}

      {viewState === 'verifyEmailOtp' && (
        <View style={styles.section}>
          <Text style={styles.title}>Verify Email OTP</Text>
          <NeuView color="#f5f5f5" width="100%" height={60} borderRadius={16} concave>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
          </NeuView>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={handleVerifyOtp}>
              <Text style={styles.neuButtonText}>Verify</Text>
            </TouchableOpacity>
          </NeuView>
        </View>
      )}

      {viewState === 'home' && (
        <View style={styles.section}>
          <Text style={styles.title}>Home Screen</Text>
          <NeuView color="#f5f5f5" width={200} height={60} borderRadius={16} concave>
            <TouchableOpacity onPress={() => navigateTo('app')}>
              <Text style={styles.neuButtonText}>Log Out</Text>
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
    backgroundColor: '#f5f5f5',
  },
  splashImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  section: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
  },
  neuButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    paddingVertical: 15,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  orText: {
    fontSize: 16,
    marginVertical: 20,
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  socialLoginContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',  // Space icons evenly
      alignItems: 'center',
      marginTop: 20,
      width: '60%',  // Adjust as necessary to fit the icons nicely
  },
  socialButton: {
    padding: 10,  // Add some padding around the icons for better touch response
  },
});

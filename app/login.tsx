import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useApp } from '@/context/AppContext';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, confirm, setConfirm } = useApp();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user:any) => {
      if (user) {
        setIsAuthenticated(true);
        router.replace('/home');
      }
    });
    return subscriber;
  }, []);


  const handlePhoneLogin = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
     
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      setConfirm(confirmation);
      Alert.alert('Success', 'Verification code has been sent to your phone');
    } catch (error: any) {
      setConfirm(null);
      Alert.alert('Error', error?.message || 'Failed to send verification code');
      console.error('Error sending code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    console.log('verifying code', verificationCode, 'confirm', confirm);
    if (!verificationCode.trim() || !confirm) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      await confirm.confirm(verificationCode);
      // The onAuthStateChanged listener will handle the navigation
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Invalid verification code');
      console.error('Error confirming code:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Phone Login</ThemedText>
        {(!confirm) && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Phone Number (e.g., +1234567890)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              editable={!loading}
            />
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handlePhoneLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Send Verification Code</ThemedText>
              )}
            </TouchableOpacity>
          </>
        )}
        {confirm && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              editable={!loading}
            />
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleVerifyCode}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Verify Code</ThemedText>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.resendButton}
              onPress={() => {
                setConfirm(null);
                setVerificationCode('');
              }}
            >
              <ThemedText style={styles.resendButtonText}>Change Phone Number</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

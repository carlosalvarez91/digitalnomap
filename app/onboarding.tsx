import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useApp } from '@/context/AppContext';

export default function OnboardingScreen() {
  const { setIsAuthenticated, setConfirm } = useApp();

  const handleComplete = async () => {
    try {
      // Get the current authenticated user
      const user = auth().currentUser;
      
      if (user) {
        // Update the user document in Firestore
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            hasCompletedOnboarding: true,
            updatedAt: firestore.FieldValue.serverTimestamp()
          });
        
        // Navigate to home screen
        router.replace('/home');
      } else {
        console.error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setIsAuthenticated(false);
      setConfirm(null);
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome to Digital Nomap!</ThemedText>
      <ThemedText style={styles.description}>
        This is your first time using the app. Let's get you started!
      </ThemedText>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleComplete}
      >
        <ThemedText style={styles.buttonText}>Get Started</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 

onPress={handleLogout}
>
<ThemedText>Logout</ThemedText>
</TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

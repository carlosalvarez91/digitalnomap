import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useApp } from '@/context/AppContext';

export default function HomeScreen() {
  const { setIsAuthenticated, setConfirm } = useApp();

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
      <ThemedText type="title" style={styles.title}>Welcome to Home</ThemedText>
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

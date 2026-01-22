import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D2D2D',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D97706',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D97706',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#D97706',
  },
});

export default SignupScreen;
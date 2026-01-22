import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Dimensions
} from "react-native";

const { width } = Dimensions.get("window");

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const usersData = await AsyncStorage.getItem("@users");
      const users = usersData ? JSON.parse(usersData) : [];
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        await AsyncStorage.setItem("userToken", "authenticated");
        await AsyncStorage.setItem("@current_user", JSON.stringify(user));

        setTimeout(() => {
          navigation.navigate("Main");
        }, 500);
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.topCircle} />

      <View style={styles.innerContainer}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.logoIcon}>✍️</Text>
          <Text style={styles.title}>MyNotes</Text>
          <Text style={styles.subtitle}>Capture your thoughts today.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email address"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate && navigation.navigate("Signup")}
          style={styles.signupLink}
        >
          <Text style={styles.signupText}>
            New here? <Text style={styles.signupHighlight}>Create a notebook</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  topCircle: {
    position: 'absolute',
    top: -width * 0.2,
    right: -width * 0.1,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: "#FDE68A",
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#2D2D2D",
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'sans-serif-condensed',
  },
  subtitle: {
    fontSize: 16,
    color: "#78716C",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#451a03",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#A8A29E",
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingLeft: 4,
  },
  input: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    color: "#1C1917",
    borderWidth: 1,
    borderColor: "#E7E5E4",
  },
  loginButton: {
    backgroundColor: "#D97706",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#FCD34D",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  signupLink: {
    marginTop: 25,
    alignItems: "center",
  },
  signupText: {
    fontSize: 15,
    color: "#78716C",
  },
  signupHighlight: {
    color: "#D97706",
    fontWeight: "700",
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

// Import your screens
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import AddNoteScreen from "../screens/Notes/AddNoteScreen";
import EditNoteScreen from "../screens/Notes/EditNoteScreen";
import NoteDetailScreen from "../screens/Notes/NoteDetailScreen";
import NotesListScreen from "../screens/Notes/NotesListScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Notes Stack
function NotesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotesList"
        component={NotesListScreen}
        options={{ title: "My Notes" }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ title: "Add Note" }}
      />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
        options={{ title: "Note Details" }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{ title: "Edit Note" }}
      />
    </Stack.Navigator>
  );
}

// Main Tabs (after login)
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Notes"
        component={NotesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator - REMOVED NavigationContainer (it's now in App.tsx)
const RootNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    // Set up interval to check auth state periodically
    const authCheckInterval = setInterval(() => {
      checkAuthStatus();
    }, 1000);

    return () => clearInterval(authCheckInterval);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("RootNavigator - Auth token:", token);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      {!isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          key="auth-stack"
        >
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          key="main-stack"
        >
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default RootNavigator;
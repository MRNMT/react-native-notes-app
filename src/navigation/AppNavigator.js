import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NotesListScreen from '../screens/Notes/NotesListScreen';
import AddNoteScreen from '../screens/Notes/AddNoteScreen';
import EditNoteScreen from '../screens/Notes/EditNoteScreen';
import NoteDetailScreen from '../screens/Notes/NoteDetailScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NotesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotesList"
        component={NotesListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{
          title: 'Add Note',
          headerStyle: {backgroundColor: '#6366f1'},
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{
          title: 'Edit Note',
          headerStyle: {backgroundColor: '#6366f1'},
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
        options={{
          title: 'Note Details',
          headerStyle: {backgroundColor: '#6366f1'},
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = ({onLogout}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Notes"
        component={NotesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="note-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerStyle: {backgroundColor: '#6366f1'},
          headerTintColor: '#fff',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}>
        {props => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
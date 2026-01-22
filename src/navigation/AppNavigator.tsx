import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesListScreen from '../screens/Notes/NotesListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotesList" component={NotesListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
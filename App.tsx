import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {StatusBar} from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

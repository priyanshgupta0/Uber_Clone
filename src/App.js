import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styles from './Stylesheet/stylesheet';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './Screens/homescreen';
import MapScreen from './Screens/MapScreen';


const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>  
            <Stack.Navigator>
              <Stack.Screen
                name="Homescreen"
                component={Homescreen}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
          {/* <Homescreen /> */}
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
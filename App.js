import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CamScreen from './screens/CamScreen';
import HomeScreen from './screens/Home/HomeScreen';
import OutputScreen from './screens/OutputScreen';
import RecentSearchScreen from './screens/Home/RecentSearchScreen';
import PlantDetailScreen from './screens/Home/PlantDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}} />
        <Stack.Screen name="CamScreen" component={CamScreen} />
        <Stack.Screen name ="OutputScreen" component = {OutputScreen}/>
        <Stack.Screen name ="RecentSearchScreen" component = {RecentSearchScreen}/>
        <Stack.Screen name ="PlantDetailScreen" component = {PlantDetailScreen}/>
        {/* other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

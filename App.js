import 'react-native-gesture-handler';
import React from 'react';
import { MyTabs } from './Components/BottomTab'
import { NavigationContainer } from '@react-navigation/native';
import { RootScreen } from './RootScreens/RootScreen';
import SplashScreen from './RootScreens/SplashScreen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RootScreen" component={RootScreen} />
        <Stack.Screen name="HomePage" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
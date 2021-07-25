import * as React from 'react';
import Driving from '../Categories/DrivingClasses'
import Charity from '../Categories/CharityWork'
import Therapist from '../Categories/Therapist'
import Gynecologist from '../Categories/Gynecologist'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {JobStackScreen, MainStackScreen, ArticleStackScreen } from '../RootScreens/RootScreen';
import { useWindowDimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';



const TopTab = createMaterialTopTabNavigator();
const PageTabs = () => {
  const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffffff',
        allowFontScaling: true,
        labelStyle: { fontSize: 14, fontWeight: 'bold' },
        style: { backgroundColor: '#900C3F', paddingVertical: 20 , marginTop: getStatusBarHeight() },
        indicatorStyle: { borderColor: '#ffffff', borderWidth: 2 },
        scrollEnabled: true

      }}
    >
      <TopTab.Screen
        name="Home"
        component={MainStackScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <TopTab.Screen
        name="Articles"
        component={ArticleStackScreen}
        options={{ tabBarLabel: 'Articles' }}
      />
      <TopTab.Screen
        name="Jobs"
        component={JobStackScreen}
        options={{ tabBarLabel: 'Jobs' }}
      />
      <TopTab.Screen
        name="Driving Classes"
        component={Driving}
        options={{ tabBarLabel: 'Driving Classes' }}
      />
      <TopTab.Screen
        name="Charity"
        component={Charity}
        options={{ tabBarLabel: 'Charity' }}
      />
      <TopTab.Screen
        name="Gynecologist"
        component={Gynecologist}
        options={{ tabBarLabel: 'Gynecologists' }}
      />
      <TopTab.Screen
        name="Therapist"
        component={Therapist}
        options={{ tabBarLabel: 'Therapists' }}
      />
    </TopTab.Navigator>
  );
}
export { PageTabs }
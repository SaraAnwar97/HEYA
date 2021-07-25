import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../HomeScreen/ChatScreen';
import Profile from '../HomeScreen/ProfileScreen';
import SignOut from '../HomeScreen/SignOut';
import { PageTabs } from './TopTab';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            activeColor="#ffffff"
        >
            <Tab.Screen

                name="Home"
                component={PageTabs}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#900C3F',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),

                }}

            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarColor: '#900C3F',
                    tabBarIcon: ({ color }) => (
                        <Icon name="chatbubbles-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#900C3F',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Sign Out"
                component={SignOut}
                options={{
                    tabBarLabel: 'Sign Out',
                    tabBarColor: '#900C3F',
                    tabBarIcon: ({ color }) => (
                        <Icon name="log-out-outline" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export { MyTabs }
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Links from '../../pages/Links/Links';
import Files from '../../pages/Files/Files';
import UserProfile from '../../pages/UserProfile/UserProfile';

const Tab = createBottomTabNavigator();


function BottomBar() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Links"
                component={Links}
                options={{
                    tabBarLabel: 'Links',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="link-variant" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Files"
                component={Files}
                options={{
                    tabBarLabel: 'Files',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="file-chart-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomBar
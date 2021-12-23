import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login/Login'
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard/Dashboard';
import  BottomBar from './components/BottomBar/BottomBar';
import EditLinks from './pages/EditPages/EditLinks';

const Stack = createNativeStackNavigator();

export default function MainComponents() {

    const isAuth = useSelector(state => state.auth.isAuth)

    if (!isAuth) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: 'Login' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Main"
                    component={BottomBar}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}


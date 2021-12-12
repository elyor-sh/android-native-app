import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login/Login'

const Stack = createNativeStackNavigator();

export default function MainComponents(props) {

    if (!props.isAuth) {
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


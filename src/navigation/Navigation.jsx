// src/navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import LeagueScreen from '../screens/LeagueScreen';
import ReportScreen from '../screens/ReportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const isLoggedin = useSelector(state => state.auth.isLoggedin)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    isLoggedin ?
                        <>
                            <Stack.Screen name="League" component={LeagueScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Report" component={ReportScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                        </>
                        :
                        <>
                            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
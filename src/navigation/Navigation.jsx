// src/navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
// import LeagueScreen from '../screens/LeagueScreen';
// import ReportScreen from '../screens/ReportScreen';
// import ProfileScreen from '../screens/ProfileScreen';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNav from './HomeStack';
import ProfileStackNav from './ProfileStack';
import NewsStackNav from './NewsStack';
import { Icon } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Navigation = () => {
    const isLoggedin = useSelector(state => state.auth.isLoggedin)
    return (
        <NavigationContainer>
            {
                isLoggedin ?
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                switch (route.name) {
                                    case "HomeStack":
                                        iconName = "home"
                                        break;
                                    case "NewsStack":
                                        iconName = "newspaper-variant-outline"
                                        break;
                                    case "ProfileStack":
                                        iconName = "account"
                                }
                                return <Icon source={iconName} size={size} color={color} />
                            },
                            tabBarActiveTintColor: '#1976D2',
                            tabBarInactiveTintColor: '#606074',
                            tabBarLabel: () => null,
                            tabBarStyle: {
                                backgroundColor: "#252536",
                            }
                        })}
                    >
                        <Tab.Screen name="HomeStack" component={HomeStackNav} options={{ headerShown: false }} />
                        <Tab.Screen name="NewsStack" component={NewsStackNav} options={{ headerShown: false }} />
                        <Tab.Screen name="ProfileStack" component={ProfileStackNav} options={{ headerShown: false }} />
                    </Tab.Navigator>
                    :
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
            }
        </NavigationContainer>
    );
};

export default Navigation;
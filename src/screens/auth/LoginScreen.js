// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import backgroundImage from '../../assets/images/bg.png';
import logo from '../../assets/images/logo.png'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from '@rneui/themed';
import { Button } from 'react-native-paper';

import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const LoginScreen = ({ navigation }) => {

    const [sleeperId, setSleeperId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return null;
    }


    const handleLogin = async () => {

        try {
            const response = await fetch('https://fantasycastcentral.com/api/user/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sleeperId, password })
            });

            if (response.status !== 200) {
                throw new Error('Login failed!');
            }

            const data = await response.json();
            const { token } = data; // Assuming your server responds with a token

            await AsyncStorage.setItem('token', token);
            dispatch(login(sleeperId));
            // Navigate to the next screen or perform other actions
        } catch (error) {
            Alert.alert('Error', error.message);
        }


    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, height: "40%" }}>
                <ImageBackground source={backgroundImage} style={styles.image}>
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', '#181928']} style={styles.gradient}>
                        <Image source={logo} style={styles.logo} />
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View style={styles.form}>
                <Text style={styles.title}>
                    Login{'\n'}
                    <Text style={{ fontSize: 16, color: "#999999", fontFamily: "Poppins_400Regular" }}>
                        Access account!
                    </Text>
                </Text>
                <Text style={styles.inputcaption}>
                    SleeperId
                </Text>
                <TextInput
                    value={sleeperId}
                    onChangeText={setSleeperId}
                    style={styles.input}
                />
                <Text style={styles.inputcaption}>
                    Password
                </Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        title="Keep me sign in"
                        checkedColor='#1976D2'
                        containerStyle={styles.checkbox}
                        textStyle={{ color: "white", fontFamily: "Poppins_400Regular" }}
                        checked
                    />
                    <Button textColor='white' labelStyle={{ fontFamily: "Poppins_400Regular" }}>Forgot Password?</Button>
                </View>
                <Button
                    mode='contained'
                    onPress={handleLogin}
                    buttonColor='#1976D2'
                    labelStyle={{ fontFamily: "Poppins_600SemiBold" }}
                >
                    Login
                </Button>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
                    <Text style={{ color: "white", fontFamily: "Poppins_400Regular" }}>Don't you have account?</Text>
                    <Button
                        onPress={() => navigation.navigate('Signup')}
                        textColor='#1976D2'
                        labelStyle={{ fontFamily: "Poppins_500Medium" }}
                    >
                        Register Now
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#181928",
        flex: 1,
        height: "100%"
        // justifyContent: "space-between"
    },
    image: {
        flex: 1,
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    logo: {
        width: "60%",
        position: "absolute",
        bottom: -50,
        resizeMode: "contain"
    },
    title: {
        margin: 'auto',
        marginBottom: 30,
        color: "white",
        fontSize: 32,
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold"
    },
    form: {
        display: "flex",
        gap: 20,
        paddingHorizontal: 20,
        height: "60%"
    },
    checkbox: {
        backgroundColor: "rgba(0,0,0,0)",
        marginLeft: -10,
        width: "50%"
    },
    checkboxContainer: {
        flexDirection: "row",
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        height: 50,
        backgroundColor: '#252536',
        borderRadius: 15,
        paddingHorizontal: 8,
        padding: 10,
        color: "#606074",
        fontFamily: "Poppins_400Regular"
    },
    inputcaption: {
        color: "white",
        marginTop: 10,
        marginBottom: -10,
        marginLeft: 10,
        fontFamily: "Poppins_400Regular"
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        position: "relative",
    }
});

export default LoginScreen;
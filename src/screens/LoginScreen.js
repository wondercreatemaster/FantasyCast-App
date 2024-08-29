// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import backgroundImage from '../assets/images/bg.jpg';
import * as keychain from 'react-native-keychain'
import { Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [sleeperId, setSleeperId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

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

            dispatch(login({ sleeperId, token }));
            navigation.replace('League');
            // Navigate to the next screen or perform other actions
        } catch (error) {
            Alert.alert('Error', error.message);
        }


    };

    return (
        <ImageBackground source={backgroundImage} style={styles.image}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        placeholder="Sleeper ID"
                        value={sleeperId}
                        onChangeText={setSleeperId}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Text style={{ color: "rgb(54, 131, 220)" }}>Forgot Password?</Text>
                    <Button title="Login" onPress={handleLogin} />
                    <Text style={{ color: "white", alignSelf: "center" }}>Don't you have account? Sign up here</Text>
                    <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    title: {
        margin: 'auto',
        marginBottom: 15,
        color: "white",
        fontSize: 36,
    },
    form: {
        display: "flex",
        gap: 10,
        padding: 15,
        backgroundColor: 'rgba(35, 43, 85, .75)',
        borderRadius: 5,
        borderTopColor: "rgba(255,255,255,.5)",
        borderTopWidth: 1
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;
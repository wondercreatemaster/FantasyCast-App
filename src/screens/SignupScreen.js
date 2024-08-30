import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text } from 'react-native';
import backgroundImage from '../assets/images/bg.jpg';
import { Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [sleeperId, setSleeperId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    if (password !== confirmpassword || password.length == 0) {
      Alert.alert("Incorrect Password!");
      return;
    }
    try {
      const response = await fetch('https://fantasycastcentral.com/api/user/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sleeperId, name, email, password })
      })


      const data = await response.json();
      Alert.alert(data.message);

      if (response.status !== 200) {
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            placeholder="Sleeper ID"
            value={sleeperId}
            onChangeText={setSleeperId}
            style={styles.input}
          />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmpassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="SignUp" onPress={handleSignup} />
          <Text style={{ color: "white", alignSelf: "center" }}>Have an account?</Text>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
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

export default SignupScreen;
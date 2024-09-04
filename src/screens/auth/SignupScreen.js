import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';

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
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>
          Sign Up{'\n'}
          <Text style={{ fontSize: 16, color: "#999999", fontFamily: "Poppins_400Regular" }}>
            Create an account!
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
          Name
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.inputcaption}>
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
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
        <Text style={styles.inputcaption}>
          Confirm Password
        </Text>
        <TextInput
          value={confirmpassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button
          mode='contained'
          buttonColor='#1976D2'
          onPress={handleSignup}
          style={{ marginTop: 30, fontFamily: "Poppins_600SemiBold" }}
        >
          Sign Up
        </Button>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
          <Text style={{ color: "white", fontFamily: "Poppins_400Regular" }}>Don't you have account?</Text>
          <Button
            onPress={() => navigation.navigate('Login')}
            textColor='#1976D2'
            labelStyle={{ fontFamily: "Poppins_500Medium" }}
          >
            Login
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181928",
    flex: 1,
    maxHeight: "100%"
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  logo: {
    width: "60%",
    resizeMode: "contain"
  },
  title: {
    margin: 'auto',
    marginBottom: 20,
    color: "white",
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold"
  },
  form: {
    display: "flex",
    gap: 20,
    padding: 20,
    marginTop: 50
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
    width: "100%"
  }
});

export default SignupScreen;
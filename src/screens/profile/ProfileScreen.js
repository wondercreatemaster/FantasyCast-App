import { Button } from 'react-native-paper';
import { Alert, TextInput, Text, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { StyleSheet } from "react-native";
import backgroundImage from '../../assets/images/bg.jpg';
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import fetchWithToken from "../../utils/fetchWithToken";


const ProfileScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  }

  const handleSubmit = () => {
    if (password != passwordconfirm) {
      Alert.alert("Incorrect Password!")
      return;
    }
    fetchWithToken(
      "https://fantasycastcentral.com/api/user/profile/update",
      {
        method: "POST",
        body: JSON.stringify({
          sleeperId: userinfo.sleeperId,
          name: userinfo.name,
          email: userinfo.email,
          password
        })
      }
    )
      .then(
        response => {
          if (response.status == 200) {
            Alert.alert("Password Updated!")
            setPassword("");
            setPasswordConfirm("");
          }
        }
      )
  }

  const [userinfo, setUserinfo] = useState({});

  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");

  useEffect(
    () => {
      fetchWithToken(
        "https://fantasycastcentral.com/api/user/profile",
        {
          method: "GET"
        }
      )
        .then(
          async response => {
            const data = await response.json();
            setUserinfo(data.data)
          }
        )
    }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header title="FantasyCast Profile" back={false} />
      <ScrollView style={styles.profileBg}>
        <View style={{ flex: 1, gap: 20 }}>

          <Text style={styles.inputcaption}>
            Sleeper ID*
          </Text>
          <TextInput
            value={userinfo.sleeperId}
            style={styles.input}
          />
          <Text style={styles.inputcaption}>
            Name*
          </Text>
          <TextInput
            value={userinfo.name}
            style={styles.input}
          />
          <Text style={styles.inputcaption}>
            Email*
          </Text>
          <TextInput
            value={userinfo.email}
            style={styles.input}
          />
          <Text style={styles.inputcaption}>
            Password*
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Text style={styles.inputcaption}>
            Confirm Password*
          </Text>
          <TextInput
            value={passwordconfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            style={styles.input}
          />
          <Button
            mode='contained'
            buttonColor='#1976D2'
            style={{ marginTop: 30, fontFamily: "Poppins_600SemiBold" }}
            onPress={handleSubmit} >
            Save
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181928",
    padding: 16,
  },
  table: {
    padding: 15
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 8,
    padding: 10,
    color: "#606074",
    fontFamily: "Poppins_400Regular"
  },
  inputcaption: {
    color: "white",
    marginTop: 10,
    marginLeft: 10,
    fontFamily: "Poppins_400Regular"
  },
  profileBg: {
    flex: 1,
    maxHeight: "100%"
  }
});

export default ProfileScreen;
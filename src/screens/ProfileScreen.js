import { Alert, Button, ImageBackground, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import backgroundImage from '../assets/images/bg.jpg';
import Header from "../components/Header";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import fetchWithToken from "../utils/fetchWithToken";


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
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.container}>
        <Header />
        <View style={styles.profileBg}>
          <Text style={styles.title}>
            Profile
          </Text>
          <View style={styles.paper}>
            <TextInput
              label="SleeperID"
              mode="outlined"
              disabled
              value={userinfo.sleeperId}
            />
            <TextInput
              label="Name"
              mode="outlined"
              disabled
              value={userinfo.name}
            />
            <TextInput
              label="Email"
              mode="outlined"
              disabled
              value={userinfo.email}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
            <TextInput
              label="Confirm Password"
              mode="outlined"
              value={passwordconfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
            <Button
              title="Submit"
              onPress={handleSubmit} />
            <Button
              title="< Back"
              color="#555555"
              onPress={handleBack}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  profileBg: {
    display: "flex",
    gap: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    marginTop: 30
  },
  title: {
    marginTop: 20,
    backgroundColor: 'rgb(73, 163, 241)',
    padding: 10,
    color: "white",
    fontSize: 30,
    borderRadius: 10,
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    marginTop: -40
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  paper: {
    backgroundColor: "white",
    padding: 15,
    gap: 10
  },
})

export default ProfileScreen;
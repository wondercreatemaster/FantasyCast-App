import { ImageBackground, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import backgroundImage from '../assets/images/bg.jpg';
import Header from "../components/Header";


const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.container}>
        <Header />
        <View style={styles.profileBg}>
          <Text style={styles.title}>
            Profile
          </Text>
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
})

export default ProfileScreen;
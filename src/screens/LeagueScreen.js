import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import backgroundImage from '../assets/images/bg.jpg';
import { useEffect, useState } from 'react';
import LeagueTable from '../components/LeagueTable';
import { useSelector } from 'react-redux';
import fetchWithToken from '../utils/fetchWithToken';
import Header from '../components/Header';

const LeagueScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [leagues, setLeagues] = useState([]);

  const auth = useSelector(state => state.auth);
  useEffect(() => {
    fetchWithToken(
      "https://fantasycastcentral.com/api/user/league/list", {
      method: 'GET'
    })
      .then(
        response => {
          response.json().then(
            data => setLeagues(data.data)
          )
        }
      )
  }, [auth])

  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.container}>
        <Header />
        <View style={styles.tableBg}>
          <Text style={styles.title}>
            Your Leagues
          </Text>
          <View style={styles.table}>
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
            <LeagueTable leagues={leagues.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))} />
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableBg: {
    display: "flex",
    gap: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    marginTop: 30
  },
  table: {
    backgroundColor: "white",
    padding: 15
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
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
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default LeagueScreen;
import { StyleSheet, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import LeagueTable from '../../components/home/league/LeagueTable';
import { useSelector } from 'react-redux';
import fetchWithToken from '../../utils/fetchWithToken';
import Header from '../../components/Header';
import { Icon } from 'react-native-paper';

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
    <View style={styles.container}>
      <Header title="Your Leagues" back={false} />
      <View style={styles.table}>
        <View style={styles.input}>
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            style={{ fontFamily: "Poppins_400Regular" }}
          />
          <Icon source="magnify" size={20} />
        </View>
        <LeagueTable leagues={leagues.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))} />
      </View>
    </View>
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
    marginBottom: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
});

export default LeagueScreen;
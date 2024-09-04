import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LeagueTableRow from './LeagueTableRow';

const LeagueTable = ({ leagues }) => {
  return (
    <View>
      <View style={styles.headergroup}>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.header}>Season</Text>
      </View>
      <View style={styles.list}>
        <ScrollView>
          {
            leagues.map(league => <LeagueTableRow key={league.league_id} league={league} />)
          }
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headergroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10
  },
  header: {
    color: "white",
    fontFamily: "Poppins_400Regular"
  },
  list: {
    backgroundColor: "#252536",
    borderRadius: 20,
    paddingHorizontal: 20,
    maxHeight: "80%"
  }
});

export default LeagueTable;
import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import LeagueTableRow from './LeagueTableRow';

const LeagueTable = ({ leagues }) => {
  return (
    <DataTable>
      <DataTable.Header className="border-b-1 border-inherit">
        <DataTable.Title style={styles.header}>Name</DataTable.Title>
        <DataTable.Title style={styles.header}>Season</DataTable.Title>
        <DataTable.Title style={styles.header}>Manage</DataTable.Title>
        <DataTable.Title style={styles.header}>Feedback</DataTable.Title>
      </DataTable.Header>
      {
        leagues.map(league => <LeagueTableRow key={league.league_id} league={league} />)
      }
    </DataTable>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  }
});

export default LeagueTable;
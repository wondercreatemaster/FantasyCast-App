import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { Text } from 'react-native';
import LeagueTableRow from './LeagueTableRow';

const LeagueTable = () => {
    return (
        <DataTable>
            <DataTable.Header className="border-b-1 border-inherit">
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Season</DataTable.Title>
                <DataTable.Title>Manage</DataTable.Title>
                <DataTable.Title>Feedback</DataTable.Title>
            </DataTable.Header>
            <LeagueTableRow />
        </DataTable>
    );
};

export default LeagueTable;
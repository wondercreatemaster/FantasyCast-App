import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { Text } from 'react-native';
import ReportTableRow from './ReportTableRow';

const ReportTable = () => {
    return (
        <DataTable>
            <DataTable.Header className="border-b-1 border-inherit">
                <DataTable.Title>Report Name</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            <ReportTableRow />
        </DataTable>
    );
};

export default ReportTable;
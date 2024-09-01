import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import ReportTableRow from './ReportTableRow';

const ReportTable = ({ reports, scheduledata }) => {
    const { report_schedule } = scheduledata;
    return (
        <DataTable>
            <DataTable.Header className="border-b-1 border-inherit gap-2">
                <DataTable.Title style={styles.header}>Report Name</DataTable.Title>
                <DataTable.Title style={styles.header}>Action</DataTable.Title>
            </DataTable.Header>
            {
                reports && reports.map(report =>
                    <ReportTableRow
                        key={report._id}
                        report={report}
                        scheduled={report_schedule[report._id]}
                    />
                )
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

export default ReportTable;
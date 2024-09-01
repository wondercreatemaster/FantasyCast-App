import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import ReportLogTableRow from './ReportLogTableRow';

const ReportLogTable = ({ reportloglist }) => {

  return (
    <DataTable>
      <DataTable.Header className="border-b-1 border-inherit gap-2">
        <DataTable.Title style={styles.header}>Report Name</DataTable.Title>
        <DataTable.Title style={styles.header}>Date</DataTable.Title>
      </DataTable.Header>
      {
        reportloglist && reportloglist.map(reportlog =>
          <ReportLogTableRow
            key={reportlog._id}
            reportlog={reportlog}
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

export default ReportLogTable;
import React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ReportLogTableRow from './ReportLogTableRow';

const ReportLogTable = ({ reportloglist }) => {

  return (
    <View>
      <View style={styles.headergroup}>
        <Text style={styles.header}>Report Name</Text>
      </View>
      <View style={styles.list}>
        <ScrollView>
          {
            reportloglist && reportloglist.map(reportlog =>
              <ReportLogTableRow
                key={reportlog._id}
                reportlog={reportlog}
              />
            )
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
    maxHeight: "83%"
  }
});

export default ReportLogTable;
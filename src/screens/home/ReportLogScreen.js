import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import fetchWithToken from '../../utils/fetchWithToken';
import ReportLogTable from '../../components/home/reportlog/ReportLogTable';
import { Icon } from "react-native-paper";

const ReportLogScreen = () => {
  const [search, setSearch] = useState("")

  const [reportloglist, setReportLogList] = useState([]);

  useEffect(() => {
    fetchWithToken(
      `https://fantasycastcentral.com/api/user/reportlog/list?current=0&pageSize=1000&filterName=${search}`,
      {
        method: "GET"
      }
    )
      .then(
        async response => {
          const data = await response.json();
          setReportLogList([...data.data.list]);
        }
      )
  }, [search])

  return (
    <View style={styles.container}>
      <Header title="FantasyCast Archive" />
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
        <ReportLogTable reportloglist={reportloglist} />
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
})

export default ReportLogScreen;
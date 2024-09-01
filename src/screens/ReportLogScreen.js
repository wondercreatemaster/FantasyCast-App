import backgroundImage from '../assets/images/bg.jpg';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import fetchWithToken from '../utils/fetchWithToken';
import ReportLogTable from '../components/ReportLogTable';

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
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.container}>
        <Header />
        <View style={styles.tableBg}>
          <Text style={styles.title}>
            FantasyCast Archive
          </Text>
          <View style={styles.table}>
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
            <ScrollView style={{ maxHeight: "80%" }}>
              <ReportLogTable reportloglist={reportloglist} />
            </ScrollView>
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
  tableBg: {
    display: "flex",
    gap: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    marginTop: 30
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
  table: {
    backgroundColor: "white",
    padding: 15
  },
})

export default ReportLogScreen;
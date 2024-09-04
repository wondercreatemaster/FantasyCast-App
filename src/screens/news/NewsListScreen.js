import { StyleSheet, TextInput, View } from "react-native";
import Header from "../../components/Header";
import { useState } from "react";
import NewsList from "../../components/news/NewsList";

const NewsListScreen = () => {

  const [search, setSearch] = useState("")

  return (
    <View style={styles.container}>
      <Header title="New & Media" back={false} />
      <View style={styles.table}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <NewsList />
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
  },
});

export default NewsListScreen;
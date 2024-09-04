import { ScrollView, StyleSheet, Text, View } from "react-native";
import NewsItem from "./NewsItem";


const NewsList = () => {
  return (
    <View>
      <View style={styles.headergroup}>
        <Text style={styles.header}>Name</Text>
        <View style={{ flexDirection: "row", gap: 30 }}>
          <Text style={styles.header}>Team</Text>
          <Text style={styles.header}>Category</Text>
        </View>
      </View>
      <View style={styles.list}>
        <ScrollView>
          <NewsItem />
        </ScrollView>
      </View>
    </View>
  )
}

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

export default NewsList;
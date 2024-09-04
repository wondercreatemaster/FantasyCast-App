import { Image, StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import { Text } from "react-native";
import { Avatar } from "react-native-paper";
import User from '../../assets/images/user.png'


const NewsViewScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="New & Media" />
      <View style={{ padding: 15, flex: 1 }}>
        <View style={styles.header}>
          <View style={{ gap: 10, flexDirection: "column", padding: 20 }}>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Avatar.Image size={20} source={User} />
              <Text className="text-white">
                Team Name here
              </Text>
            </View>
            <Text className="text-white" style={{ fontSize: 20 }}>
              Author Name here
            </Text>
            <Text className="text-[#606074]">
              Category here
            </Text>
          </View>
          <Image source={User} style={styles.useravatar} resizeMethod="scale" resizeMode="contain" />
        </View>
        <View style={{ padding: 15, gap: 15 }}>
          <Text className="text-white font-bold" style={{ fontSize: 18 }}>
            Title here!
          </Text>
          <Text className="text-white">
            Content here!
          </Text>
        </View>
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
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  useravatar: {
    height: "120%",
    width: "50%",
  },
  header: {
    backgroundColor: "#252536",
    borderRadius: 20,
    maxHeight: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    overflow: "hidden"
  }
});

export default NewsViewScreen;
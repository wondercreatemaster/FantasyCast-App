import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import User from "../../assets/images/user.png"

const NewsItem = () => {
  return (
    <View style={styles.container}>
      <Avatar.Image size={30} source={User} />
      <View style={{ flex: 1, gap: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text className="text-white">
            This is content
          </Text>
          <View style={{ flexDirection: "row", gap: 30 }}>
            <Avatar.Image size={20} source={User} />
            <Text className="text-white">
              Fallers
            </Text>
          </View>
        </View>
        <Text className="text-white">
          This is main Content. There will
        </Text>
        <Text className="text-[#606074]">
          2024-09-03 00:00:00
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1.3,
    borderColor: "#2E2F3E",
    flexDirection: "row",
    paddingVertical: 20,
    gap: 15
  }
})

export default NewsItem;
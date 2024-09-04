import { Image, StyleSheet, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Icon, IconButton, Text } from "react-native-paper";


const Header = ({ title, back = true }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        iconColor={back ? "white" : "#181928"}
        disabled={!back}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      <Menu>
        <MenuTrigger>
          <IconButton icon="menu" iconColor="#606074" size={30} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => navigation.navigate('Profile')} text='Profile' />
          <MenuOption onSelect={() => navigation.navigate('ReportLog')} text='Report Log' />
          <MenuOption onSelect={() => dispatch(logout())} text='Logout' />
        </MenuOptions>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30
  },
  title: {
    color: "#1976D2",
    fontFamily: "Poppins_600SemiBold"
  }
})

export default Header;
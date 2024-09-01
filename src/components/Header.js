import { Image, StyleSheet, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import logoImage from '../assets/images/logo.png'
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Menu>
        <MenuTrigger>
          <Icon name="menu" />
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
  },
  logo: {
    width: 70,
    height: 50,
    resizeMode: "contain",
    marginVertical: 10
  },
})

export default Header;
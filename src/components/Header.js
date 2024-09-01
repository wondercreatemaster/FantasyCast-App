import { Image, StyleSheet, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import logoImage from '../assets/images/logo.png'
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Menu>
        <MenuTrigger>
          <Icon name="menu" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => navigation.navigate('Profile')} text='Profile' />
          <MenuOption onSelect={() => navigation.navigate('Login')} text='Logout' />
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
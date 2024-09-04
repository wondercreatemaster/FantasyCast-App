import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";


const ProfileStack = createNativeStackNavigator();

const ProfileStackNav = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNav
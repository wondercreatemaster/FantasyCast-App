import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LeagueScreen from "../screens/home/LeagueScreen"
import ReportScreen from "../screens/home/ReportScreen"
import ReportLogScreen from "../screens/home/ReportLogScreen"


const HomeStack = createNativeStackNavigator()

const HomeStackNav = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="League" component={LeagueScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Report" component={ReportScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ReportLog" component={ReportLogScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNav
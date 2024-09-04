import { createNativeStackNavigator } from "@react-navigation/native-stack"
import NewsListScreen from "../screens/news/NewsListScreen";
import NewsViewScreen from "../screens/news/NewsViewScreen";

const NewsStack = createNativeStackNavigator();

const NewsStackNav = () => {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="NewsList" component={NewsListScreen} options={{ headerShown: false }} />
      <NewsStack.Screen name="NewsView" component={NewsViewScreen} options={{ headerShown: false }} />
    </NewsStack.Navigator>
  )
}

export default NewsStackNav;
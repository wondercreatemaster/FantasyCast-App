import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux"

const fetchWithToken = async (url, options = {}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Auth-Token': token } : {}),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers
  });
}

export default fetchWithToken;
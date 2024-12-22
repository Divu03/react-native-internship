import { StyleSheet } from "react-native";
import LoginScreen from './login';

export default function Index() {
  return (
    <LoginScreen />
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
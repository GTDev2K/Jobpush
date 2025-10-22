import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AppStyles from "../AppStyles";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function HomePage({ navigation }) {
  const { token,keepConnected } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && keepConnected) {
      navigation.replace("TabNavigator");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logoJobPush-Photoroom.jpg")}
        ></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bienvenue !</Text>
      </View>
      <View style={styles.redButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpPage")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>S'INSCRIRE</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>OU</Text>
      <View style={styles.redButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignInPage")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>SE CONNECTER</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.googleContainer}>
        <GoogleLoginButton title="Google" onPress={() => navigation.navigate("Profil")}  />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
    // borderColor: "red",
    // borderWidth: 1,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  title: AppStyles.title,
  redButtonContainer: {
    width: "100%",
    height: "10%",
    paddingVertical: 10,
    paddingHorizontal: 110,
    justifyContent: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  body: AppStyles.body,
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
  googleContainer: {
    width: "100%",
    marginTop: 40,
    alignItems: "center",
    // borderColor: "orange",
    // borderWidth: 1,
  },
});

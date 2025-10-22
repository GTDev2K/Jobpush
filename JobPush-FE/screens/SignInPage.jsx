import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { updateToken, updateUser } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { setKeepConnected } from "../reducers/user";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function SignInPage({ navigation }) {
  const dispatch = useDispatch();
  const [focusedField, setFocusedField] = useState(null);
  const [email, setEmail] = useState("");
  const [checkMail, setCheckMail] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
    const { keepConnected } = useSelector((state) => state.user);

  const handleRegister = () => {
    fetch(`https://job-push-be.vercel.app/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
          return;
        }

        dispatch(updateToken(data.token));
        dispatch(
          updateUser({
            email: data.email,
            token: data.token,
            firstName: data.firstName,
            name: data.name,
            phoneNumber: data.phoneNumber,
            address: data.address,
            preferences: data.preferences,
            alerts: data.alerts,
            favorites: data.favorites,
            applications: data.applications,
          })
        );

        navigation.navigate("TabNavigator");
      });
  };

  const clearEmail = () => {
    setEmail("");
  };

  const clearPassword = () => {
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logoJobPush-Photoroom.jpg")}
        ></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Connexion</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              focusedField === "email" && styles.inputFocused,
            ]}
            placeholder="email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TouchableOpacity style={styles.cross} onPress={clearEmail}>
            <FontAwesome name="close" color="grey" size={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              focusedField === "password" && styles.inputFocused,
            ]}
            placeholder="mot de passe"
            placeholderTextColor="#999"
            secureTextEntry={isPasswordSecure}
            autoCapitalize="none"
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <TouchableOpacity style={styles.cross} onPress={clearPassword}>
            <FontAwesome name="close" color="grey" size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.eye}>
            <FontAwesome
              name="eye"
              color="grey"
              size={18}
              onPress={() => {
                isPasswordSecure
                  ? setIsPasswordSecure(false)
                  : setIsPasswordSecure(true);
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.errorMessageContainer}>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.buttonAndTextContainer}>
              <BouncyCheckbox
            onPress={() => dispatch(setKeepConnected(!keepConnected))}
            text="Rester connecté ? "
            size={25}
            fillColor="#F72C03"
            unFillColor="#F9F1F1"
            iconStyle={{ borderColor: "#F72C03" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{
              fontFamily: "Poppins_400Regular",
              textDecorationLine: "none",
            }}
            style={styles.checkbox}
          />
         
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
          style={styles.button}
        >
   

          <Text style={styles.buttonText}>LET'S GO !</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.body}>Vous n'avez pas de compte ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpPage")}
            style={styles.link}
          >
            <Text style={styles.linkText}>Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  logo: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
    marginBottom: 30,
  },
  title: AppStyles.title,
  row: {
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  cross: {
    position: "absolute",
    right: 10,
    zindex: 2,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  eye: {
    position: "absolute",
    right: 40,
    zindex: 2,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "16%",
    justifyContent: "space-between",
    // borderColor: "green",
    // borderWidth: 1,
    margin: 30,
  },
  input: {
    ...AppStyles.input,
    // borderColor: "red",
    // borderWidth: 1,
    marginBottom: 0,
  },
  inputFocused: AppStyles.inputFocused,
  errorMessageContainer: {
    width: "70%",
  },
  errorMessage: {
    color: "red",
    marginTop: 4,
    textAlign: "center",
  },
  buttonAndTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
  link: AppStyles.link,
  body: AppStyles.body,
  linkText: AppStyles.linkText,
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    // borderColor: "blue",
    // borderWidth: 1,
  },  checkbox: {
  width: "100%",

  justifyContent:"center",
  paddingHorizontal: 100,
  marginBottom: 20,
  // borderColor : "Blue",
  // borderWidth : 1,
}


  
});

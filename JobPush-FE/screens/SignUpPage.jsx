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
import { updateUser, updateToken, signup } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function SignUpPage({ navigation }) {
  const [focusedField, setFocusedField] = useState(null);
  const [email, setEmail] = useState("");
  const [checkMail, setCheckMail] = useState(false);
  const [password, setCheckPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const user = useSelector((state) => state.user.profile.email);
  const dispatch = useDispatch();

  function handleSubmit() {
    if (validateEmail(email)) {
      setCheckMail(false);
      // dispatch(updateUser(email));
    } else {
      setCheckMail(true);
    }
  }

  function validateEmail(email) {
    var emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );
    return emailReg.test(email);
  }

  const handleRegister = () => {
    setErrorMessage("");
    handleSubmit(); // vérifie l'email et fait le dispatch

    // if (checkMail) {
    //   return; // stoppe ici si l'email est invalide
    // }

    fetch(`https://job-push-be.vercel.app/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: passwordConfirm,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateToken(data.token));
          dispatch(signup());
          setCheckMail("");
          setCheckPassword("");
          setPasswordConfirm("");
          navigation.navigate("Profile");
        }
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
          return;
        }
      });
  };

  const clearEmail = () => {
    setEmail("");
  };

  const clearPassword = () => {
    setCheckPassword("");
  };

  const clearConfirmPassword = () => {
    setPasswordConfirm("");
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
        <Text style={styles.title}>Inscription</Text>
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

        {/* {checkMail && (
        <Text style={{ color: "red", marginTop: 4 }}>{errorMessage}</Text>
        )} */}
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
            onChangeText={(value) => setCheckPassword(value)}
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

        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              focusedField === "confirm" && styles.inputFocused,
            ]}
            placeholder="confirmer mot de passe"
            placeholderTextColor="#999"
            secureTextEntry={isPasswordSecure}
            autoCapitalize="none"
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
            onChangeText={(value) => setPasswordConfirm(value)}
            value={passwordConfirm}
          />
          <TouchableOpacity style={styles.cross} onPress={clearConfirmPassword}>
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
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Profil") //contournement des check-out pour travailler sur Profil
            handleRegister();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>LET'S GO !</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.body}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignInPage")}
            style={styles.link}
          >
            <Text style={styles.linkText}>Connectez-vous</Text>
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
    height: "25%",
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
  },
});

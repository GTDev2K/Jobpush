import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import AppStyles from "../AppStyles";
import { updateUser } from "../reducers/user";
import { useEffect } from "react";
import { Alert } from "react-native";
const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

const options = {
  option1: "Notifications en temps réel",
  option2: "Notification une fois par jour",
  option3: "Alerte par mail une fois par jour",
};
const getOptionKey = (alertValue) => {
  return (
    Object.keys(options).find((key) => options[key] === alertValue) || "option1"
  );
};

export default function Alerts({ navigation, route }) {
  const [selectedValue, setSelectedValue] = useState(
    route.params.origin === "signup" ? "option1" : getOptionKey(alerts)
  );
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.user.profile.alerts);

  useEffect(() => {
    if (route.params.origin !== "signup") {
      setSelectedValue(getOptionKey(alerts));
    }
  }, [alerts]);

  const handleSubmit = () => {
    fetch(`https://job-push-be.vercel.app/users/alerts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        alerts: options[selectedValue],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          Alert.alert(
            "Alerte enregistrée",
            "Votre alerte a bien été prise en compte !"
          );
          navigation.navigate("TabNavigator");
        } else {
        }
      });
  };

  const handleSubmitProfile = () => {
    fetch(`https://job-push-be.vercel.app/users/alerts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        alerts: options[selectedValue],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("Account");
          dispatch(updateUser({ alerts: data.alerts }));
        } else {
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mon alerte</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option1"
            status={selectedValue === "option1" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option1")}
            color="#F72C03" 
          />
          <Text style={styles.body} onPress={() => setSelectedValue("option1")}>
            {options.option1}
          </Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option2"
            status={selectedValue === "option2" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option2")}
            color="#F72C03"
          />
          <Text style={styles.body} onPress={() => setSelectedValue("option2")}>
            {options.option2}
          </Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="option3"
            status={selectedValue === "option3" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("option3")}
            color="#F72C03"
          />
          <Text style={styles.body} onPress={() => setSelectedValue("option3")}>
            {options.option3}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {route.params.origin === "signup" ? (
          <>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>CREER MA RECHERCHE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("TabNavigator")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>PASSER</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => handleSubmitProfile()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>METTRE A JOUR</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: AppStyles.title,
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
    // borderColor: "red",
    // borderWidth: 1,
  },
  radioContainer: {
    width: "80%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  radioButton: {
    flexDirection: "row", // Arrange radio button and label in a row
    alignItems: "center", // Align items vertically in the center
  },
  body: AppStyles.body,
  buttonContainer: {
    width: "70%",
    height: "20%",
    margin: "20",
    padding: "20",
    justifyContent: "space-between",
    // borderColor: "green",
    // borderWidth: 1,
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
});

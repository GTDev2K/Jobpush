import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ArticleDetails({ navigation }) {
  const route = useRoute(); //Pour accéder aux params de offres
  const { title, description, content, author, tags } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.photoContainer}>
          <Image
            source={require("../assets/logoJobPush-Photoroom.jpg")}
            style={styles.logo}
          />
        </View>
        <View style={styles.textHeader}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </View>
      <View style={styles.infos}>
        <Text style={styles.textInfo}>{description}</Text>
      </View>
      <View style={styles.card}>
        <ScrollView style={{ maxHeight: 420 }}>
          <Text style={styles.body}>{content}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Astuces")}
        >
          <FontAwesome name="arrow-left" size={20} color="#F9F1F1" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    justifyContent: "flex-start",
    alignItems: "center",
    // bordercolor : "blue",
    // borderWidth :1,
  },
  photoContainer: {
    width: "20%",
    height: "70%",
    borderRadius: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  header: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  textHeader: {
    maxWidth: "70%",
    // borderColor: "grey",
    // borderWidth: 1,
  },
  title: {
    ...AppStyles.headline,
    maxWidth: "100%",
    fontSize: 13,
    // borderColor: "pink",
    // borderWidth: 1,
  },
  author: {
    ...AppStyles.important,
    // borderColor: "orange",
    // borderWidth: 1,
  },
  textInfo: {
    ...AppStyles.body,
    fontSize: 13,
    width: "100%",
    // borderColor: "orange",
    // borderWidth: 1,
  },
  infos: {
    width: "100%",
    paddingLeft: 10,
    // borderColor: "green",
    // borderWidth: 1,
  },
  infoDetails: AppStyles.body,
  source: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    // borderColor: "red",
    // borderWidth: 1,
  },
  card: {
    backgroundColor: "#F3E4E5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2B3033",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
    margin: 20,
    padding: 10,
  },
  body: AppStyles.body,
  buttons: {
    width: "100%",
    // borderColor: "red",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    //paddingHorizontal: 20,
    backgroundColor: "#F72C03",
    borderRadius: 50,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 7,
    marginTop: 4,
    // borderColor: "blue",
    // borderWidth: 1,
    width: 45,
    height: 45,
  },
  buttonText: AppStyles.buttonText,
});

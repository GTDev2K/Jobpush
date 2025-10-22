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
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  updateUser,
  removeFavorite,
  addApplication,
} from "../reducers/user";

export default function OfferDetails({ navigation }) {
  const route = useRoute(); //Pour accéder aux params de offres
  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const favorites = useSelector((state) => state.user.profile.favorites);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const {
    title,
    compagny,
    grade,
    publicationDate,
    source,
    offerLink,
    description,
    _id,
  } = route.params;

  const handleApply = async () => {
    const response = await fetch(`https://job-push-be.vercel.app/offers/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        offerId: _id,
      }),
    });

    const data = await response.json();
    if (data.result) {
      Alert.alert(
        "Candidature envoyée !",
        "Votre candidature a bien été prise en compte."
      );
        Linking.openURL(offerLink);
      dispatch(addApplication(_id));
    } else {

      Alert.alert("Erreur", data.error || "Une erreur est survenue.");
    }
  };

  // Ancien fetch

  const handleLikeOffer = () => {
    fetch(
      `https://job-push-be.vercel.app/users/favorites${favorites?.includes(_id) ? "/remove" : "/"}`,
      {
        method: favorites?.includes(_id) ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: _id,
          token: token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          setErrorMessage(data.error || "An error occurred. Please try again.");
        } else {
          dispatch(
            favorites?.includes(_id) ? removeFavorite(_id) : addFavorite(_id)
          );
        }
      })
      .catch((e) => {
        Alert.alert(e.message);
      });
  };
  const heartIconStyle = {
    fontSize: 24,
    height: 32,
    width: 32,
    color: favorites?.includes(_id) ? "#F72C03" : "#ccc",
    backgroundColor: "#F9F1F1",
    borderRadius: 50,
    padding: 4,
    zIndex: 2, //place l'élément au dessus du reste comme sur un système de calque
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  };

  const favoritePress = (
    <TouchableOpacity onPress={handleLikeOffer}>
      <FontAwesome
        name={favorites?.includes(_id) ? "heart" : "heart-o"}
        style={heartIconStyle}
      />
    </TouchableOpacity>
  );

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (grade > i) {
      stars.push(<FontAwesome key={i} name="star" color="#F72C03" size={16} />);
    } else {
      stars.push(<FontAwesome key={i} name="star" size={16} />);
    }
  }

  const dateCreation = new Date(publicationDate);
  const dateFormatted = dateCreation.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <Text style={styles.compagny}>{compagny}</Text>
        </View>
        <View style={styles.heartContainer}>{favoritePress}</View>
      </View>
      <View style={styles.infos}>
        <Text style={styles.textInfo}>{stars} sur Glassdoor</Text>
        <Text style={styles.textInfo}>Publiée le : {dateFormatted}</Text>
        <Text style={styles.source}>{source}</Text>
      </View>
      <View style={styles.card}>
        <ScrollView style={{ maxHeight: 350 }}>
          <Text style={styles.body}>{description}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            handleApply();
          }}
        >
          <Text style={styles.buttonText}>CANDIDATER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Offres")}
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
  compagny: {
    ...AppStyles.body,
    fontSize: 13,
    maxWidth: "100%",
    // borderColor: "orange",
    // borderWidth: 1,
  },
  heartContainer: {
    width: 35,
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
  applyButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F72C03",
    borderRadius: 10,
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
    width: "40%",
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

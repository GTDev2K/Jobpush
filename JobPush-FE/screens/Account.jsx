import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AppStyles from "../AppStyles";
import PreferencesCard from "../components/PreferencesCard";
import { useSelector } from "react-redux";
import city from "../json/citie.json";
import region from "../json/regions.json";
import sector from "../json/sector.json";
import { useDispatch } from "react-redux";
import { updateToken } from "../reducers/user";
import { setKeepConnected } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Account({ navigation }) {
  const preferences = useSelector((state) => state.user.profile.preferences);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { keepConnected } = useSelector((state) => state.user);

  const handleLogout = () => {
    fetch(`https://job-push-be.vercel.app/logout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateToken(null));
        }
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mon compte</Text>
      <Text
        style={[
          AppStyles.subtitle,
          { alignSelf: "flex-start", marginLeft: 20 },
        ]}
      >
        Mes préférences
      </Text>
      <View style={styles.preferencesContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {preferences?.map((data, i) => { 
            const cityCode = data.cityJob || data.city; // recupere les valeurs d'entre par les preférences user et les traduits par les valeurs brut
            const cityMatch = city.find((c) => c.insee === cityCode);                       // ex : 75101 pour paris 
            const regionMatch = region.find((r) => r.code === data.region);
            const sectorMatch = sector.find((s) => s.code === data.sector);
            return (
              <PreferencesCard
                key={i}
                {...data}
                cityJob={cityMatch ? cityMatch.name : cityCode}
                region={regionMatch ? regionMatch.label : null}
                sector={sectorMatch ? sectorMatch.label : data.sector}
                index={i}
              />
            );
          })}
        </ScrollView>
      </View>
      {/* <View style={styles.separator} /> */}
      <View style={styles.addSearchRow}>
        <Text style={styles.body}>Ajoutez nouvelle recherche</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate("Preferences")}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Alerts", { origin: "account" })}
      >
        <Text style={styles.buttonText}>ALERTES</Text>
        <FontAwesome name="bell" size={20} color="#F9F1F1" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ParametresCompte")}
      >
        <Text style={styles.buttonText}>PARAMETRES DU COMPTE</Text>
        <FontAwesome name="cog" size={22} color="#F9F1F1" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogout();
          dispatch(setKeepConnected(!keepConnected));
          navigation.navigate("SignInPage");
        }}
      >
        <Text style={styles.buttonText}>SE DÉCONNECTER</Text>
        <FontAwesome name="power-off" size={22} color="#F9F1F1" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  title: {
    ...AppStyles.title,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  preferencesContainer: {
    width: "100%",
    height: "38%",
    alignItems: "center",
    paddingTop: 8,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  // separator: {
  //   width: "90%",
  //   height: 1,
  //   backgroundColor: "#BDBDBD",
  //   marginVertical: 10,
  // },
  addSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  body: AppStyles.body,
  plusButton: {
    marginLeft: 10,
    backgroundColor: AppStyles.color.accent,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: AppStyles.color.background,
    fontSize: 35,
    fontWeight: "bold",
    lineHeight: 24,
  },
  button: {
    ...AppStyles.button,
    marginBottom: 20,
    width: 270,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    ...AppStyles.buttonText,
    marginRight: 10,
    marginBottom: 0,
    // borderColor: "blue",
    // borderWidth: 1,
  },
});

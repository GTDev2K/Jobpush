import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import AppStyles from "../AppStyles";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";
import citie from "../json/citie.json";
import secteur from "../json/sector.json";
import teletravail from "../json/remote.json";
import contrat from "../json/contrat.json";
import regions from "../json/regions.json";
import { Alert } from "react-native";
const { width } = Dimensions.get("window");
import { addPreference } from "../reducers/user";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

export default function Preferences({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const [contractType, setcontractType] = useState("");
  const [remote, setRemote] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [sector, setSector] = useState("");
  const [cityJob, setCityJob] = useState("");
  const [region, setRegion] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setcontractType("");
      setRemote("");
      setJobTitle("");
      setSector("");
      setCityJob("");
      setRegion("");
    }, [])
  );

  const handleSubmit = async () => {
    const response = await fetch(`https://job-push-be.vercel.app/users/addPreferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        contractType: contractType,
        remote: remote,
        jobTitle: jobTitle,
        sector: sector,
        cityJob: cityJob,
        region: region,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.result) {
        dispatch(
          addPreference({
            _id: data._id,
            contractType,
            remote,
            jobTitle,
            sector,
            cityJob,
            region,
          })
        );
        setcontractType("");
        setRemote("");
        setJobTitle("");
        setSector("");
        setCityJob("");
        setRegion("");
        Alert.alert(
          "Préférences enregistrées",
          "Votre recherche a bien été prise en compte !"
        );
        navigation.navigate("Offres");
      } else {
        console.error("Erreur lors de la mise à jour des préférences");
      }
    }
  };

  const clearJobTitle = () => {
    setJobTitle("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle recherche d'emploi</Text>
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              focusedField === "JobTitle" && styles.inputFocused,
            ]}
            placeholder="Poste"
            onChangeText={(value) => setJobTitle(value)}
            value={jobTitle}
            onFocus={() => setFocusedField("JobTitle")}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity style={styles.cross} onPress={clearJobTitle}>
            <FontAwesome name="close" color="grey" size={18} />
          </TouchableOpacity>
        </View>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={secteur}
          labelField="label"
          valueField="code"
          placeholder="Secteur"
          value={sector}
          onChange={(item) => setSector(item.code)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={contrat}
          labelField="label"
          valueField="value"
          placeholder="Contrat"
          value={contractType}
          onChange={(item) => setcontractType(item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={citie}
          labelField="name"
          valueField="insee"
          placeholder="Ville"
          value={cityJob}
          onChange={(item) => setCityJob(item.insee)}
          search // Active la barre de recherche
          searchPlaceholder="Ville"
          inputSearchStyle={styles.inputSearch}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownBottom}
          itemTextStyle={styles.itemTextDropdown}
          data={regions}
          labelField="label"
          valueField="code"
          placeholder="Region"
          value={region}
          onChange={(item) => setRegion(item.code)}
          search // Active la barre de recherche
          searchPlaceholder="Rechercher une région"
          inputSearchStyle={styles.inputSearch}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderDropdown}
          containerStyle={styles.containerDropdownTop}
          itemTextStyle={styles.itemTextDropdown}
          data={teletravail}
          labelField="label"
          valueField="value"
          placeholder="Remote"
          value={remote}
          onChange={(item) => setRemote(item.value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>ENREGISTRER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
    textAlign: "center",
  },
  title: { ...AppStyles.title, textAlign: "center" },
  inputContainer: {
    width: "100%",
    height: 350,
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  input: {
    ...AppStyles.input,
    marginBottom: 0,
    // borderColor: "red",
    // borderWidth: 1,
  },
  inputFocused: AppStyles.inputFocused,
  dropdown: {
    ...AppStyles.dropdown,
    marginBottom: 0,
  },
  placeholderDropdown: AppStyles.placeholderDropdown,
  containerDropdownBottom: AppStyles.containerDropdownBottom,
  containerDropdownTop: AppStyles.containerDropdownTop,
  itemTextDropdown: AppStyles.itemTextDropdown,
  inputSearch: AppStyles.inputSearch,
  buttonContainer: {
    alignItems: "flex-end",
    paddingBottom: 50,
    paddingTop: 30,
    // borderColor: "pink",
    // borderWidth: 1,
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
});

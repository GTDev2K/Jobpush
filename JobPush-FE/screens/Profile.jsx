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
import { updateUser } from "../reducers/user";
import citie from "../json/citie.json";
import secteur from "../json/sector.json";
import teletravail from "../json/remote.json";
import contrat from "../json/contrat.json";
import regions from "../json/regions.json";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [name, setName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [phonenumber, setPhoneNumber] = useState(null);
  const [streetNumber, setStreetNumber] = useState(null);
  const [streetName, setStreetName] = useState(null);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [contractType, setcontractType] = useState(null);
  const [remote, setRemote] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [sector, setSector] = useState(null);
  const [cityJob, setCityJob] = useState(null);
  const [region, setRegion] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (errorMessage && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [errorMessage]);

  // Validation helpers
  const isNumeric = (value) => /^[0-9]+$/.test(value);

  const isPhoneNumber = (value) => /^0[1-9][0-9]{8}$/.test(value);
  // Cette fonction vérifie que le numéro de téléphone est au format français (commence par 0, puis 9 chiffres).

  const isZipCode = (value) => /^[0-9]{5}$/.test(value);
  // Cette fonction vérifie que le code postal contient exactement 5 chiffres.

  const handleSubmit = () => {
    // Validation
    if (streetNumber && !isNumeric(streetNumber)) {
      setErrorMessage(
        "Le numéro de rue doit contenir uniquement des chiffres."
      );
      return;
    }
    // Si le champ numéro de rue existe et n'est pas numérique, on affiche un message d'erreur et on arrête la soumission.

    if (phonenumber && !isPhoneNumber(phonenumber)) {
      setErrorMessage(
        "Le numéro de téléphone doit être au format français (10 chiffres)."
      );
      return;
    }
    // Si le numéro de téléphone existe et n'est pas au bon format, on affiche un message d'erreur et on arrête la soumission.

    if (zipCode && !isZipCode(zipCode)) {
      setErrorMessage("Le code postal doit contenir 5 chiffres.");
      return;
    }
    // Si le code postal existe et n'est pas composé de 5 chiffres, on affiche un message d'erreur et on arrête la soumission.

    fetch(`https://job-push-be.vercel.app/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        name: name,
        firstName: firstName,
        phoneNumber: phonenumber,
        streetNumber: streetNumber,
        streetName: streetName,
        city: city,
        zipCode: zipCode,
        contractType: contractType,
        remote: remote,
        jobTitle: jobTitle,
        sector: sector,
        cityJob: cityJob,
        region: region,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            updateUser({
              name: name,
              firstName: firstName,
              phoneNumber: phonenumber,
              address: [
                {
                  streetNumber: streetNumber,
                  streetName: streetName,
                  city: city,
                  zipCode: zipCode,
                },
              ],
              preferences: [
                {
                  contractType,
                  remote,
                  jobTitle,
                  sector,
                  cityJob,
                  region,
                },
              ],
              favorites: [],
              
            })
          );
          navigation.navigate("Alerts", { origin: "signup" });
        } else {
          setErrorMessage(
            data.message || "Une erreur est survenue. Veuillez réessayer."
          );
        }
      });
  };

  const clearName = () => {
    setName("");
  };
  const clearFirstName = () => {
    setFirstName("");
  };
  const clearPhoneNumber = () => {
    setPhoneNumber("");
  };
  const clearStreetNumber = () => {
    setStreetNumber("");
  };
  const clearStreetName = () => {
    setStreetName("");
  };
  const clearCity = () => {
    setCity("");
  };
  const clearZipCode = () => {
    setZipCode("");
  };
  const clearJobTitle = () => {
    setJobTitle("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Mon profil</Text>
      <ScrollView style={styles.scrollableContainer} ref={scrollRef}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Civilité</Text>
          <Text style={styles.important}>*obligatoires</Text>
        </View>
        <View style={styles.topInputContainer}>
          <View style={styles.errorMessageContainer}>
            {errorMessage && (
              <Text style={{ color: "red", margin: 10 }}>{errorMessage}</Text>
            )}
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "Name" && styles.inputFocused,
              ]}
              placeholder="Nom*"
              placeholderTextColor={errorMessage && "rgba(255, 0, 0, 0.4)"}
              onChangeText={(value) => setName(value)}
              value={name}
              onFocus={() => setFocusedField("Name")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearName}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "FirstName" && styles.inputFocused,
              ]}
              placeholder="Prenom*"
              placeholderTextColor={errorMessage && "rgba(255, 0, 0, 0.4)"}
              onChangeText={(value) => setFirstName(value)}
              value={firstName}
              onFocus={() => setFocusedField("FirstName")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearFirstName}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "PhoneNumber" && styles.inputFocused,
              ]}
              placeholder="Numéro de téléphone*"
              placeholderTextColor={errorMessage && "rgba(255, 0, 0, 0.4)"}
              onChangeText={
                (value) => setPhoneNumber(value.replace(/[^0-9]/g, "")) // Permet uniquement la saisie de chiffres dans le numéro de téléphone
              } // Empêche la saisie de lettres
              value={phonenumber}
              keyboardType="numeric"
              onFocus={() => setFocusedField("PhoneNumber")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearPhoneNumber}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "StreetNumber" && styles.inputFocused,
              ]}
              placeholder="Numéro de rue"
              onChangeText={(value) =>
                setStreetNumber(value.replace(/[^0-9]/g, ""))
              } // Empêche la saisie de lettres
              value={streetNumber}
              keyboardType="numeric"
              onFocus={() => setFocusedField("StreetNumber")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearStreetNumber}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "Address" && styles.inputFocused,
              ]}
              placeholder="Nom de rue"
              onChangeText={(value) => setStreetName(value)}
              value={streetName}
              onFocus={() => setFocusedField("Address")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearStreetName}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "City" && styles.inputFocused,
              ]}
              placeholder="Ville"
              onChangeText={(value) => setCity(value)}
              value={city}
              onFocus={() => setFocusedField("City")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearCity}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                focusedField === "ZipCode" && styles.inputFocused,
              ]}
              placeholder="Code Postal"
              onChangeText={(value) => setZipCode(value.replace(/[^0-9]/g, ""))} // Empêche la saisie de lettres
              value={zipCode}
              keyboardType="numeric"
              onFocus={() => setFocusedField("ZipCode")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity style={styles.cross} onPress={clearZipCode}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Mes préférences</Text>
        </View>
        <View style={styles.bottomInputContainer}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>SUIVANT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.color.background,
    //paddingTop: 20,
    // borderColor: "red",
    // borderWidth: 1,
  },
  scrollableContainer: {
    flex: 1,
    // width: width,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  textContainer: {
    // marginLeft: 20,
    marginVertical: 10,
  },
  title: { ...AppStyles.title, marginLeft: 20 },
  subtitle: AppStyles.subtitle,
  important: AppStyles.important,
  topInputContainer: {
    width: "100%",
    height: 450,
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  bottomInputContainer: {
    width: "100%",
    height: 370,
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
  eye: {
    position: "absolute",
    right: 40,
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
    paddingRight: 20,
    paddingTop: 30,
    // borderColor: "pink",
    // borderWidth: 1,
  },
  button: AppStyles.button,
  buttonText: AppStyles.buttonText,
});

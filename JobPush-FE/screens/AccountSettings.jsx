import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import { useState } from "react";
import AppStyles from "../AppStyles";

const { width } = Dimensions.get("window");

export default function ParametresCompte({ navigation }) {
  const dispatch = useDispatch();
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const userToken = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.profile);
  const [name, setName] = useState(user.name || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user.phoneNumber ? String(user.phoneNumber) : ""
  );
  const [city, setCity] = useState(user.address[0]?.city || "");
  const [zipCode, setZipCode] = useState(user.address[0]?.zipCode || "");
  const [streetNumber, setStreetNumber] = useState(
    user.address[0]?.streetNumber ? String(user.address[0]?.streetNumber) : ""
  );
  const [streetName, setStreetName] = useState(
    user.address[0]?.streetName || ""
  );

  const handleEdit = () => {
    fetch(`https://job-push-be.vercel.app/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
        name,
        firstName,
        phoneNumber,
        streetNumber,
        streetName,
        city,
        zipCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          alert(data.message || "Erreur lors de la modification");
          return;
        }
        // Met à jour le store Redux
        navigation.navigate("TabNavigator");
        dispatch(
          updateUser({
            name,
            firstName,
            email,
            phoneNumber,
            address: [
              {
                streetNumber,
                streetName,
                city,
                zipCode,
              },
            ],
          })
        );
        alert("Informations mises à jour !");
      });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            fetch(`https://job-push-be.vercel.app/users/${userToken}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => response.json())
              .then((data) => {
                if (!data.result) {
                  alert(data.error || "Erreur lors de la suppression");
                  return;
                }

                navigation.navigate("HomePage");
              });
          },
        },
      ]
    );
  };

  const clearName = () => {
    setName("");
  };
  const clearFirstName = () => {
    setFirstName("");
  };
  const clearEmail = () => {
    setEmail("");
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres compte</Text>
      <View style={styles.infoTable}>
        <View style={styles.row}>
          <Text style={styles.label}>Nom</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity style={styles.cross} onPress={clearName}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Prenom</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TouchableOpacity style={styles.cross} onPress={clearFirstName}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.rightContainer}>
            <TextInput style={styles.value} value={email} editable={false} />
            <TouchableOpacity style={styles.cross} onPress={clearEmail}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tél.</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.cross} onPress={clearPhoneNumber}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>N°</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={streetNumber}
              onChangeText={setStreetNumber}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.cross} onPress={clearStreetNumber}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Adresse</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={streetName}
              onChangeText={setStreetName}
            />
            <TouchableOpacity style={styles.cross} onPress={clearStreetName}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ville</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity style={styles.cross} onPress={clearCity}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Code Postal</Text>
          <View style={styles.rightContainer}>
            <TextInput
              style={styles.value}
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.cross} onPress={clearZipCode}>
              <FontAwesome name="close" color="grey" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>
          ENREGISTRER MES NOUVELLES INFOS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete()}
      >
        <Text style={styles.deleteButtonText}>SUPPRIMER MON COMPTE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.navigate("Account");
        }}
      >
        <FontAwesome name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    alignItems: "center",
  },
  title: AppStyles.title,
  infoTable: {
    width: width * 0.85,
    marginTop: 10,
    // borderColor : "blue",
    // borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FEDDD7",
    borderBottomWidth: 2,
    borderBottomColor: "#F72C03",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 2,
    // borderColor : "orange",
    // borderWidth: 1,
  },
  label: {
    ...AppStyles.body,
    color: "grey",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    ...AppStyles.body,
    marginRight: 10,
    minWidth : 180,
    textAlign : 'right',
    // borderColor : "purple",
    // borderWidth: 1,
  },
  cross: {
    zindex: 2,
  },
  editButton: {
    ...AppStyles.button,
    marginVertical: 5,
  },
  editButtonText: AppStyles.buttonText,
  deleteButton: {
    ...AppStyles.button,
    marginVertical: 5,
  },
  deleteButtonText: AppStyles.buttonText,
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
    marginVertical: 5,
    // borderColor: "blue",
    // borderWidth: 1,
    width: 45,
    height: 45,
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyles from "../AppStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { removePreference } from "../reducers/user";

export default function PreferencesCard(props) {
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { jobTitle, sector, contractType, cityJob, region, remote, _id } =
    props;

  // Créer une description lisible de la préférence pour l'accessibilité
  const preferenceDescription = [
    jobTitle,
    sector,
    contractType,
    cityJob,
    region,
    remote
  ].filter(Boolean).join(", "); //Boolean convertit une valeur en true ou false (undifined, "", null = false et string = true)

  const handleDeletePreference = async () => {
    const response = await fetch(`https://job-push-be.vercel.app/users/preference/remove`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        _id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.result) {
        dispatch(removePreference(_id));

      } else {
        console.error("Erreur lors de la mise à jour des préférences");
      }
    }
  };

  return (
    <View 
    style={styles.card}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={`Préférence d'emploi: ${preferenceDescription}`}
      accessibilityHint="Contient les critères de recherche d'emploi">
      <TouchableOpacity 
      onPress={() => handleDeletePreference()}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Supprimer la préférence ${preferenceDescription}`}
      accessibilityHint="Appuyez pour supprimer cette préférence de recherche d'emploi"
      >
        <FontAwesome
          name="close"
          size={25}
          color={AppStyles.color.text}
          style={{ position: "absolute", right: 0 }}
          accessible={false}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {jobTitle && 
        <Text 
        style={styles.text}
        accessible={true}
        accessibilityLabel={`Poste: ${jobTitle}`}
        >{jobTitle}</Text>}
        {sector && 
        <Text 
        style={styles.text}
        accessible={true}
        accessibilityLabel={`Secteur: ${sector}`}
        >{sector}</Text>}
        {contractType && 
        <Text 
        style={styles.text}
        accessible={true}
        accessibilityLabel={`Type de contrat: ${contractType}`}
        >{contractType}</Text>}
        {cityJob && 
        <Text 
        style={styles.text}
        accessible={true}
        accessibilityLabel={`Ville: ${cityJob}`}
        >{cityJob}</Text>}
        {region && 
        <Text 
        style={styles.text}
        accessible={true}
        accessibilityLabel={`Région: ${region}`}
        >{region}</Text>}
        {remote && 
        <Text 
        style={styles.text}
        accessible={true}
        accessibilityLabel={`Télétravail: ${remote}`}
        >{remote}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: "auto",
    width: 350,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: AppStyles.color.cards,
    padding: 10,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  textContainer: {
    maxWidth: 300,
    minHeight: 30,
    justifyContent: "center",
  },
  text: AppStyles.body,
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import { useState } from "react";
import { Modal } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaskedTextInput } from "react-native-mask-text";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Applications({ navigation, ...props }) {
  const token = useSelector((state) => state.user.token);
  const [showModal, setShowModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [notes, setNotes] = useState(null);
  const [candidateDate, setCandidateDate] = useState(null);
  const [relanceDate, setRelanceDate] = useState(null);
  const [interviewDate, setInterviewDate] = useState(null);
  const [thanksDate, setThanksDate] = useState(null);

  const handleTodoList = () => {
    setShowModal(true);
  };

  const handleNotes = () => {
    setShowNotes(true);
  };

  function formatDateForGoogle(dateStr) {   // transforme la date donné en date voulu par google
    // dateStr: "DD/MM/YYYY"
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    // Google Calendar format: YYYYMMDD
    return `${year}${month}${day}`;
  }

  function getGoogleEndDate(dateStr) {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    date.setDate(date.getDate() + 1);
    const endYear = date.getFullYear();
    const endMonth = String(date.getMonth() + 1).padStart(2, "0");
    const endDay = String(date.getDate()).padStart(2, "0");
    return `${endYear}${endMonth}${endDay}`;
  }

  const updateTodo = () => {
    fetch(
      `https://job-push-be.vercel.app/applications/todo?offerId=${props.offerId._id}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recallDate: relanceDate,
          interviewDate: interviewDate,
          TyLetterDate: thanksDate,
          notes: notes,
        }),
      }
    );
  };


  React.useEffect(() => {
    const date = new Date(props.applicationDate);
    setCandidateDate(
      `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`
    );
  }, [props.applicationDate]);

    // Fonction pour obtenir le statut d'accessibilité des checkboxes
  const getCheckboxAccessibilityState = (isChecked) => ({
    checked: isChecked,
  });

  // Fonction pour obtenir le label accessible des dates
  const getDateAccessibilityLabel = (label, value, isChecked) => {
    const status = isChecked ? "Complété" : "Non complété";
    const dateText = value ? `Date saisie: ${value}` : "Aucune date saisie";
    return `${label}, ${status}, ${dateText}`;
  };

  //modal qui contient toutes les données de la Todo avec les input , le bouton pour la modal des notes
  const modal = (  
    <Modal 
    visible={showModal} 
    transparent={true}
    accessible={true}
    accessibilityViewIsModal={true}
    onRequestClose={() => setShowModal(false)}
    >             
      <View 
      style={styles.modal}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel="Fenêtre de todo list">
        <View style={styles.todo}>
          <Text 
          style={AppStyles.subtitle}
          accessible={true}
          accessibilityRole="header">Todo List</Text>
          <View
            style={[
              AppStyles.inputContainer,
              { flexDirection: "row", flexWrap: "wrap", alignItems: "center" }, 
            ]}
            accessible={true}
            accessibilityRole="group"
            accessibilityLabel="Liste des tâches de candidature"
          >
            <View 
            style={styles.row}
            accessible={true}
            accessibilityRole="group">
              <BouncyCheckbox
                isChecked={!!candidateDate}
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
                accessible={true}
                accessibilityRole="checkbox"
                accessibilityLabel={getDateAccessibilityLabel(
                  "Date de candidature", 
                  candidateDate, 
                  !!candidateDate
                )}
                accessibilityState={getCheckboxAccessibilityState(!!candidateDate)}
              />
              <Text 
              style={styles.label}
              accessible={false} // Évite la redondance avec le checkbox
              >Date de candidature :</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={candidateDate}
                onChangeText={setCandidateDate}
                keyboardType="numeric"
                accessible={true}
                accessibilityRole="textfield"
                accessibilityLabel="Saisir la date de candidature"
                accessibilityHint="Format jour/mois/année, par exemple 15/03/2025"
              />
            </View>
            <View 
            style={styles.row}
            accessible={true}
            accessibilityRole="group">
              <BouncyCheckbox
                isChecked={!!relanceDate}
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
                accessible={true}
                accessibilityRole="checkbox"
                accessibilityLabel={getDateAccessibilityLabel(
                  "Date de relance", 
                  relanceDate, 
                  !!relanceDate
                )}
                accessibilityState={getCheckboxAccessibilityState(!!relanceDate)}
              />
              <Text 
              style={styles.label}
              accessible={false}>Date de relance :</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={relanceDate}
                onChangeText={setRelanceDate}
                keyboardType="numeric"
                accessible={true}
                accessibilityRole="textfield"
                accessibilityLabel="Saisir la date de relance"
                accessibilityHint="Format jour/mois/année, par exemple 22/03/2025"
              />
            </View>
            <View 
            style={styles.row}
            accessible={true}
            accessibilityRole="group">
              <BouncyCheckbox
                isChecked={!!interviewDate}
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
                accessible={true}
                accessibilityRole="checkbox"
                accessibilityLabel={getDateAccessibilityLabel(
                  "Date d'entretien", 
                  interviewDate, 
                  !!interviewDate
                )}
                accessibilityState={getCheckboxAccessibilityState(!!interviewDate)}
              />
              <Text 
              style={styles.label}
              accessible={false}>Date de l'entretien :</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={interviewDate}
                onChangeText={setInterviewDate}
                keyboardType="numeric"
                accessible={true}
                accessibilityRole="textfield"
                accessibilityLabel="Saisir la date d'entretien"
                accessibilityHint="Format jour/mois/année, par exemple 30/03/2025"
              />
            </View>
            <View 
            style={styles.row}
            accessible={true}
            accessibilityRole="group">
              <BouncyCheckbox
                isChecked={!!thanksDate}
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
                accessible={true}
                accessibilityRole="checkbox"
                accessibilityLabel={getDateAccessibilityLabel(
                  "Mail de remerciements", 
                  thanksDate, 
                  !!thanksDate
                )}
                accessibilityState={getCheckboxAccessibilityState(!!thanksDate)}
              />
              <Text 
              style={styles.label}
              accessible={false}
              >Mail de remerciements :</Text>
              <MaskedTextInput
                mask="99/99/9999"
                placeholder="JJ/MM/AAAA"
                style={styles.value}
                value={thanksDate}
                onChangeText={setThanksDate}
                keyboardType="numeric"
                accessible={true}
                accessibilityRole="textfield"
                accessibilityLabel="Saisir la date du mail de remerciements"
                accessibilityHint="Format jour/mois/année, par exemple 05/04/2025"
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={AppStyles.button}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Ouvrir les notes"
              accessibilityHint="Prendre des notes sur le poste, l'entreprise, ou le processus de candidature"
              onPress={() => handleNotes()}
            >
              <Text style={AppStyles.buttonText} accessible={false}>NOTES</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={AppStyles.button}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Ajouter à Google Agenda"
            accessibilityHint="Synchroniser les dates de ma todo list avec mon agenda Google"
            onPress={() => setShowCalendarModal(true)}
          >
            <Text style={AppStyles.buttonText} accessible={false}>AJOUTER A GOOGLE AGENDA</Text>
          </TouchableOpacity>

          <View 
          style={styles.button}
          accessible={true}
          accessibilityRole="group"
          accessibilityLabel="Actions de la todo list">
            <TouchableOpacity
              style={styles.backButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Retour"
              accessibilityHint="Fermer la todo list et revenir à l'écran précédent"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <FontAwesome name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Sauvegarder la todo list"
              accessibilityHint="Enregistrer toutes les modifications apportées à ma todo list"
              onPress={() => {
                updateTodo(), setShowModal(false);
              }}
            >
              <Text style={AppStyles.buttonText} accessible={false}>SAUVEGARDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );


  //modal des notes
  const note = ( 
    <Modal 
    visible={showNotes} 
    transparent={true}
    accessible={true}
    accessibilityViewIsModal={true}
    onRequestClose={() => setShowNotes(false)}>
      <View 
      style={styles.modal}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel="Fenêtre de prise de notes">
        <View 
        style={[styles.todo, { height: 500 }]}
        accessible={true}
        accessibilityRole="header">
          <Text style={AppStyles.subtitle}>Notes</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              multiline={true}
              scrollEnabled={true}
              placeholder="Tapez vos notes ici..."
              onChangeText={(value) => setNotes(value)}
              value={notes}
              onFocus={() => setFocusedField("Notes")}
              onBlur={() => setFocusedField(null)}
              accessible={true}
              accessibilityRole="textfield"
              accessibilityLabel="Zone de saisie des notes"
              accessibilityHint="Vous pouvez saisir des notes sur le poste, l'entreprise, ou vos impressions"
              accessibilityMultiline={true}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.backButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Retour"
              accessibilityHint="Fermer les notes et revenir à la todo list"
              onPress={() => {
                setShowNotes(false);
              }}
            >
              <FontAwesome name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  //gestion du google agenda avec une modal qui affiche en fonction de si il y a une date dans l'input ou pas 
  const googleAgenda = (    
    <Modal 
    visible={showCalendarModal} 
    transparent={true} 
    animationType="fade"
    accessible={true}
    accessibilityViewIsModal={true}
    onRequestClose={() => setShowCalendarModal(false)}>
      <View style={styles.modal}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel="Fenêtre d'ajout à Google Agenda">
        <View style={[styles.todo, { height: "auto" }]}>
          <Text 
          style={AppStyles.body}
          accessible={true}
          accessibilityRole="header"
          >Ajouter à Google Agenda</Text>
          {candidateDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Ajouter la candidature du ${candidateDate} à Google Agenda`}
              accessibilityHint="Ouvre Google Agenda pour créer un événement pour la date de candidature"
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Date%20de%20candidature&dates=${formatDateForGoogle(
                    candidateDate
                  )}/${getGoogleEndDate(
                    candidateDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText} accessible={false}>Candidature</Text>
            </TouchableOpacity>
          )}
          {relanceDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Ajouter la relance du ${relanceDate} à Google Agenda`}
              accessibilityHint="Ouvre Google Agenda pour créer un événement pour la date de relance"
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Date%20de%20relance&dates=${formatDateForGoogle(
                    relanceDate
                  )}/${getGoogleEndDate(
                    relanceDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText} accessible={false}>Relance</Text>
            </TouchableOpacity>
          )}
          {interviewDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Ajouter l'entretien du ${interviewDate} à Google Agenda`}
              accessibilityHint="Ouvre Google Agenda pour créer un événement pour la date d'entretien"
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Date%20d'entretien&dates=${formatDateForGoogle(
                    interviewDate
                  )}/${getGoogleEndDate(
                    interviewDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText} accessible={false}>Entretien</Text>
            </TouchableOpacity>
          )}
          {thanksDate && (
            <TouchableOpacity
              style={[AppStyles.button, { marginBottom: 10 }]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Ajouter le mail de remerciements du ${thanksDate} à Google Agenda`}
              accessibilityHint="Ouvre Google Agenda pour créer un événement pour la date du mail de remerciements"
              onPress={() => {
                Linking.openURL(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lettre%20de%20remerciement&dates=${formatDateForGoogle(
                    thanksDate
                  )}/${getGoogleEndDate(
                    thanksDate
                  )}&details=Ajouté%20depuis%20JobPush`
                );
              }}
            >
              <Text style={AppStyles.buttonText} accessible={false}>Remerciements</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.backButton}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Retour"
            accessibilityHint="Fermer Google Agenda et revenir à la todo list"
            onPress={() => {
              setShowCalendarModal(false);
            }}
          >
            <FontAwesome name="arrow-left" size={20} color="#fff" accessible={false}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );


  const dateCreation = new Date(props.applicationDate);
  const dateFormatted = dateCreation.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Label principal pour la carte de candidature
  const applicationCardLabel = `Candidature pour ${props.offerId.title} chez ${props.offerId.compagny}, postulé le ${dateFormatted}`;

  return (
    <View 
    style={styles.container}
    accessible={true}
    accessibilityRole="group"
    accessibilityLabel={applicationCardLabel}>
      <View 
      style={styles.textContainer}
      accessible={true}
      accessibilityRole="group"
      accessibilityLabel="Informations de la candidature">
        <View>
          <Text 
          style={AppStyles.inputSearch}
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel={`Poste: ${props.offerId.title}`}
          >{props.offerId.title} </Text>
          <Text 
          style={AppStyles.important}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Entreprise: ${props.offerId.compagny}`}
          >{props.offerId.compagny}</Text>
        </View>
        <Text 
        style={AppStyles.body}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`Date de candidature: ${dateFormatted}`}
        >Candidature le: {dateFormatted} </Text>
      </View>
      <TouchableOpacity 
      style={styles.todoContainer}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Ouvrir la todo list"
      accessibilityHint={`Accéder à ma todo list de candidature pour le poste ${props.offerId.title} chez ${props.offerId.compagny}`}
      onPress={handleTodoList}>
        <Text style={AppStyles.buttonText} accessible={false}>TODO LIST</Text>
        {showCalendarModal && googleAgenda}
        {note}
        {modal}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "18%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3E4E5",
    margin: 10,
    padding: 5,
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
    // boderColor: "blue",
    // borderWidth: 1,
  },
  textContainer: {
    height: "100%",
    width: "60%",
    justifyContent: "space-between",
    // boderColor: "blue",
    // borderWidth: 1,
  },
  todo: {
    height: 500,
    width: "90%",
    justifyContent: "space-between",
    backgroundColor: AppStyles.color.background,
    padding: 20,
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoContainer: {
    ...AppStyles.button,
    width: "40%",
    // boderColor: "blue",
    // borderWidth: 1,
  },
  buttonText: AppStyles.buttonText,
  inputContainer: {
    width: "100%",
  },
  textArea: {
    height: "70%",
    textAlignVertical: "top",
    borderColorTop: AppStyles.color.text,
    borderTopWidth: 0.5,
  },
  checkbox: {
    width: "12%",
    padding: 5,
    paddingLeft: 0,
    // borderColor: "red",
    // borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
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
    fontSize: 12,
  },
  value: {
    ...AppStyles.body,
    fontSize: 12
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
    // borderColor: "blue",
    // borderWidth: 1,
    width: 45,
    height: 45,
  },
});

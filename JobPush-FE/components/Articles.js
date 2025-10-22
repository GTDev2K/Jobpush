import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
const { width } = Dimensions.get('window');

export default function Articles({ title, description, icon, onPress }) {
  return (
    <TouchableOpacity 
    style={styles.container}
    accessible={true}
    accessibilityLabel="Accéder aux articles"
    accessibilityHint={`Le sujet est ${title} et voici la description ${description}`}
    onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.icon}>{icon}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width*0.9,
    height: 140,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F3E4E5",
    marginBottom: 20,
    padding: 5,
    shadowColor: "#2B3033",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  title: {
    ...AppStyles.headline,
    width: width*0.8,
    height: 'auto',
    borderBottomColor: "#F72C03",
    borderBottomWidth: 1,
    fontSize: 13,
    // borderColor: "red",
    // borderWidth: 1,
  },
  description: AppStyles.important,
  icon: {
    position: "absolute",
    top: -10, //positionner l'élément
    right: -10, //positionner l'élément
    backgroundColor: "#F9F1F1",
    borderRadius: 50,
    padding: 8,
    zIndex: 1, //place l'élément au dessus du reste comme sur un système de calque
    shadowColor: "#2B3033",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
});

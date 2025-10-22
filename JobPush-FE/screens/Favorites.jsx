import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AppStyles from "../AppStyles";
import { useSelector } from "react-redux";
import JobCard from "../components/Jobcard";
import { useFocusEffect } from "@react-navigation/native";

export default function Favorites({ navigation }) {
  const token = useSelector((state) => state.user.token);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getFavorites = async () => {
        // 1. Récupérer le profil utilisateur pour avoir les IDs des favoris
        const res = await fetch(`https://job-push-be.vercel.app/users/profile/${token}`);
        const data = await res.json();
        if (data.result && data.favorites && data.favorites.length > 0) {
          // 2. Récupérer les détails des offres favorites
          const offersRes = await fetch(`https://job-push-be.vercel.app/offers/byIds`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: data.favorites }),
          });
          const offersData = await offersRes.json();
          setFavorites(offersData.offers || []);
        } else {
          setFavorites([]);
        }
      };
      if (token) getFavorites();
    }, [])
  );

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {favorites.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Aucune offre en favori.
          </Text>
        ) : (
          favorites.map((data, i) => (
            <JobCard key={i} {...data} navigation={navigation} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F1F1",
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  scrollView: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
});

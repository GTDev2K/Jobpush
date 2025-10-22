import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppStyles from "../AppStyles";
import Applications from "../components/Applications";
import { useSelector } from "react-redux";

const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function JobApplications({ navigation }) {
  const token = useSelector((state) => state.user.token);
  const [applicationsData, setApplicationsData] = useState([]);

  const fetchApplications = async () => {
    const response = await fetch(
      `https://job-push-be.vercel.app/applications?token=${token}`
    );
    const data = await response.json();
    setApplicationsData(data.applications);
  };

  useFocusEffect(
    useCallback(() => {
      fetchApplications();
    }, [])
  );

  return (
    <View style={styles.container}>
      {applicationsData.length === 0 ? (
        <Text style={styles.message}>Aucune candidature pour le moment.</Text>
      ) : (
        applicationsData.map((data, i) => (
          <Applications key={data.id || i} {...data} navigation={navigation} />
        ))
      )}
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
});

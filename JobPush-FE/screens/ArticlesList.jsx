import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // https://oblador.github.io/react-native-vector-icons/#FontAwesome
const { width } = Dimensions.get('window');

export default function ArticlesList({ navigation }) {
  const route = useRoute();
  const [subCategories, setSubCategories] = useState([]);
  const { title, iconName } = route.params;
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  useEffect(() => {
    fetch(`https://job-push-be.vercel.app/articles/byCategory/${title}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setSubCategories(data.articles);
        else setSubCategories([]);
      });
  }, [title]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {subCategories.map((data, i) => (
          <Articles
          key={i}
          title={data.title}
          description={data.description}
          icon={<FontAwesome name={iconName} size={22} color={'#F72C03'}/>} //on reconstruit l'icone à partir du iconName qui nous vient de Category.jsx
          onPress={() =>
            navigation.navigate("ArticleDetails", {
              title: data.title,
              description: data.description,
              content: data.content,
              author: data.author,
              tags: data.tags,
            })
          }/>
        ))}
        <View style={styles.buttons}>
          <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Astuces")}>
            <FontAwesome name="arrow-left" size={20} color="#F9F1F1" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F1F1",
    // borderColor: "red",
    // borderWidth: 1,
  },
  title: { 
    ...AppStyles.title ,
    textAlign:"center"
  },
  description: AppStyles.important,
  scrollView: {
    width: width,
    alignItems: "center",
    paddingVertical: 20,
    // borderColor: "blue",
    // borderWidth: 1,
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
    marginBottom: 20,
    marginTop: 4,
    // borderColor: "blue",
    // borderWidth: 1,
    width: 45,
    height: 45,
  },
});

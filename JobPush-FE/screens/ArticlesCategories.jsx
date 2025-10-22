import { StyleSheet, Dimensions, Text, TextInput, View, SafeAreaView, TouchableOpacity, Button, ScrollView } from "react-native";
import AppStyles from "../AppStyles";
import Articles from "../components/Articles";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // https://oblador.github.io/react-native-vector-icons/#FontAwesome
import { useState } from "react";
const { width } = Dimensions.get('window');

//un tableau qui contient les catégories d'articles
const articles = [
  {
    title: "Préparer sa candidature",
    description:
      "Tous nos tips pour rédiger un CV et une lettre de motivation adaptés au poste que vous visez. Les erreurs à éviter, les bonnes pratiques... On vous dit tout !",
    icon : <FontAwesome name="file-text-o" size={22} color={'#F72C03'}/>,
    iconName : "file-text-o",
  },
  {
    title: "Reussir son entretien",
    description:
      "Entretiens de motivation, entretiens techniques... Découvrez nos conseils. On vous aide à préparer des réponses aux questions courantes et des questions à poser.",
    icon : <FontAwesome name="handshake-o" size={22} color={'#F72C03'}/>,
    iconName : "handshake-o",
  },
  {
    title: "Stratégie de recherche d'emploi",
    description:
      "Utiliser les réseaux sociaux, les sites d'emploi et le réseautage pour trouver des opportunités. Optimisez vos recherches pour gagner du temps et trouver un emploi plus rapidement.",
      icon : <FontAwesome name="search" size={22} color={'#F72C03'}/>,
      iconName: "search",
  },
  {
    title: "Conseils métiers",
    description:
      "Explorer les tendances du marché, les compétences demandées, les outils les plus utilisés et les opportunités de carrière dans votre secteur d'activité.",
    icon : <FontAwesome name="comment" size={22} color={'#F72C03'}/>,
    iconName : "comment",
  },
  {
    title: "Soft skills",
    description:
      "Ecoute active, résolution de problème, attitude positive face au changement... Développer des compétences interpersonnelles essentielles pour le milieu professionnel.",
    icon : <FontAwesome name="group" size={22} color={'#F72C03'}/>,
    iconName: "group",
  },
];

export default function TabScreen1({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

  const fetchArticlesByTags = async (search) => {
    if (!search) {
      setFilteredArticles(articles);
      return;
    }
    const tags = search.split(" ").filter(Boolean).join(",");
    const response = await fetch(`https://job-push-be.vercel.app/articles/byTags?tags=${tags}`);
    const data = await response.json();
    if (data.result) {
      setFilteredArticles(
        data.articles.map((a, i) => ({
          ...a,
          key:{i},
          icon: <FontAwesome name="lightbulb-o" size={22} color="#F72C03" />,
        }))
      );
    }
  };

const handleSearch = (value) => {
  setSearch(value);
  fetchArticlesByTags(value);
};


const clearSearch = () => {
  setSearch('')
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Astuces</Text>
        <View style={styles.inputSearchContainer}>
          <FontAwesome name="search" color="#F72C03" size={18} />
          <TextInput
          placeholder="Recherche"
          style={styles.inputSearch}
          onChangeText={handleSearch}
          value={search}
          />
          <TouchableOpacity style={styles.cross} onPress={clearSearch}>
            <FontAwesome name='close' color='grey' size={18}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredArticles.map((article, index) => (
            <Articles
            key={index}
            title={article.title}
            description={article.description}
            icon={article.icon}
            onPress={() =>
            navigation.navigate("ArticlesList", {
            title: article.title,
            iconName: article.iconName, //au lieu de faire passer icon, on fait passer iconName en params de navigation et on reconstruit l'icone dans ArticlesList
            })
          }/>
        ))}
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
  title: AppStyles.title,
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "pink",
    // borderWidth: 1,
  },
  inputSearch: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    paddingBottom: 8,
    // borderColor: "pink",
    // borderWidth: 1,
  },
  inputSearchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderBottomColor: "#2B3033",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  scrollView: {
    width: width,
    alignItems: "center",
    paddingVertical: 20,
    // borderColor: "blue",
    // borderWidth: 1,
  },
});


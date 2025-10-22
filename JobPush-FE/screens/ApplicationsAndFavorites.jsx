import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import JobApplications from "./JobApplications";
import Favorites from "./Favorites";
import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";

const TopTab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation}) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: "#F9F1F1", height: 60 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        let iconName = route.name === "Mes candidatures" ? "briefcase" : "heart";
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 4,
            }}
          >
            <FontAwesome
              name={iconName}
              size={22}
              color={focused ? "#F72C03" : "#2B3033"}
            />
            <Text style={{ color: focused ? "#F72C03" : "#2B3033", fontSize: 12 }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ApplicationsAndFavorites() {
  return (
    <TopTab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <TopTab.Screen name="Mes candidatures" component={JobApplications} />
      <TopTab.Screen name="Mes favoris" component={Favorites} />
    </TopTab.Navigator>
  );
}
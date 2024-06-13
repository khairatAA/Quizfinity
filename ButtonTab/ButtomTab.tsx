import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LeadershipBoard from "../screens/LeadershipBoard";
import Profile from "../screens/Profile";
import CustomBottomTab from "../components/shared/BottomTabs/CustomBottomTab";
import AttemptsScreen from "../screens/AttemptsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ButtomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Attempts") {
            iconName = focused ? "clipboard-check" : "clipboard-check-outline";
          } else if (route.name === "Ranking") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          } else {
            iconName = "home-outline"; // Default icon in case none match
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#989AFF",
        tabBarStyle: {
          backgroundColor: "#614BF2", // Change the background color
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: "OpenSans-SemiBold",
          fontSize: 14,
        },
        headerShown: false,
      })}
    >
      {/* tabBar={props => <CustomBottomTab {...props} />} */}
      {/* <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      > */}
      <Tab.Screen
        options={{ tabBarLabel: "Home" }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Attempts" }}
        name="Attempts"
        component={AttemptsScreen}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Ranking" }}
        name="Ranking"
        component={LeadershipBoard}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Profile" }}
        name="Profile"
        component={Profile}
      />
      {/* </Tab.Group> */}
    </Tab.Navigator>
  );
};

export default ButtomTab;
